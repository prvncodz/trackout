import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Log from "../models/log.model.js";
import User from "../models/user.model.js";
import Set from "../models/set.model.js";
import Exercise from "../models/exercise.model.js";
import mongoose from "mongoose";

const CreateLog = asyncHandler(async (req, res) => {
    const { logName } = req.body
    if (!logName) {
        throw new ApiError(400, "log name is required")
    }
    const log = await Log.create({
        logName,
        owner: req.user?._id
    })
    if (!log) {
        throw new ApiError(400, "failed to create log")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, log, "log created successfully"))
});

const GetAllLogs = asyncHandler(async (req, res) => {

    const { userId } = req.params
    const { page = 1, limit = 10 } = req.query
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skipNum = (pageNum - 1) * limitNum

    if (!userId) {
        throw new ApiError(400, "user id is required")
    }
    if (isNaN(pageNum) || isNaN(limitNum)) {
        throw new ApiError(400, "invalid page or limit")
    }
    if (pageNum < 1 || limitNum < 1) {
        throw new ApiError(400, "page and limit must be greater than 0")
    }

    const logs = await Log
        .find({ owner: userId })
        .skip(skipNum)
        .limit(limitNum)
        .sort({ createdAt: -1 })

    if (!logs) {
        throw new ApiError(400, "failed to get all logs")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, logs, "logs fetched successfully"))
});

const MarkLogCompleted = asyncHandler(async (req, res) => {
    const { logId } = req.params
    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    const completedDate = Date.now()

    const log = await Log.find(
        {
            _id: logId,
            completedAt: { $exists: true }
        })

    if (log) {
        throw new ApiError(400, "log already had marked as completed")
    }

    const markedLog = await Log.findByIdAndUpdate(
        logId,
        {
            $set: {
                completedAt: completedDate
            }
        },
        {
            returnDocument: "after"
        }
    )
    if (!markedLog) {
        throw new ApiError(404, "log not found")
    }

    const user = await User.findByIdAndUpdate(  //push the log to previousWorkouts of user as user have completd it
        log?.owner,
        {
            $push: {
                previousWorkouts: {
                    $each: [logId],
                    $position: 0
                }
            }
        }
    )

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, markedLog, "log marked as completed"))
})

const GetLogWithId = asyncHandler(async (req, res) => {
    const { logId } = req.params
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    const log = await Log.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(logId)
            }
        },
        {
            $lookup: {
                from: "exercises",
                localField: "exercises",
                foreignField: "_id",
                as: "exercises",
                pipeline: [
                    {
                        $lookup: {
                            from: "sets",
                            localField: "sets",
                            foreignField: "_id",
                            as: "sets"
                        }
                    }
                ]
            }
        },
    ])

    console.log("log", log)
    if (!log) {
        throw new ApiError(400, "log not found")
    }
    return res.status(200).json(new ApiResponse(200, log, "log fetched successfully"))
})

const UpdateLog = asyncHandler(async (req, res) => {
    const { logId } = req.params
    const { logName } = req.body
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    const log = await Log.findByIdAndUpdate(
        logId,
        {
            $set: {
                logName: logName
            }
        },
        {
            returnDocument: 'after'
        }
    )
    if (!log) {
        throw new ApiError(400, "log not found")
    }
    return res.status(200).json(new ApiResponse(200, log, "log updated successfully"))
})

const DeleteLog = asyncHandler(async (req, res) => {
    const { logId } = req.params
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    const log = await Log.aggregate([
        {
            $match: {
                _id: logId
            }
        },
        {
            $lookup: {
                from: "exercises",
                localField: "exercises",
                foreignField: "_id",
                as: "exercises"
            }
        }
    ])
    if (!log[0]) {
        throw new ApiError(400, "log not found")
    }
    if (log[0]?.exercises?.sets?.length) {
        try {
            const allsets = log[0]?.exercises?.sets
            allsets.forEach(async (set) =>
                await Set.findByIdAndDelete(set)
            )
        } catch (err) {
            throw new ApiError(500, "failed to delete sets")
        }
    }
    if (log[0]?.exercises?.length) {
        try {
            const allExercises = log[0]?.exercises
            allExercises.forEach(async (ex) =>
                await Exercise.findByIdAndDelete(ex?._id)
            )
        } catch (err) {
            throw new ApiError(500, "failed to delete exercises")
        }
    }

    const deletedLog = await Log.findByIdAndDelete(logId)
    if (!deletedLog) {
        throw new ApiError(500, "failed to delete log")
    }

    return res.status(200).json(new ApiResponse(200, log[0], "log deleted successfully"))
})

const DuplicateLog = asyncHandler(async (req, res) => {
    //get log id 
    // get the log
    const { logId } = req.params
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    const log = await Log.findById(logId)
    if (!log) {
        throw new ApiError(404, "log not found")
    }
    const { _id, completedAt, createdAt, updatedAt, ...copy } = log
    const newLog = await Log.create(copy)
    if (!newLog) {
        throw new ApiError(400, "failed to create log")
    }
    return res
        .status(201)
        .json(new ApiResponse(201, newLog, "duplicate log created successfully"))
})


export { CreateLog, GetAllLogs, GetLogWithId, MarkLogCompleted, UpdateLog, DeleteLog, DuplicateLog }
