import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Log from "../models/log.model.js";
import User from "../models/user.model.js";


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
    const log = await Log
        .findById(logId)

    if (!log) {
        throw new ApiError(400, "log not found")
    }
    return res.status(200).json(new ApiResponse(200, log, "log fetched successfully"))
})

export { CreateLog, GetAllLogs, GetLogWithId, MarkLogCompleted }
