import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Log from "../models/log.model.js";
import CompletedWorkout from "../models/completedWorkouts.model.js";
import Set from "../models/set.model.js";
import Exercise from "../models/exercise.model.js";
import Activity from "../models/activity.model.js";
import mongoose from "mongoose";

const CreateLog = asyncHandler(async (req, res) => {
    const { logName } = req.body;
    if (!logName) {
        throw new ApiError(400, "log name is required");
    }
    const log = await Log.create({
        logName,
        owner: req.user?._id,
    });

    if (!log) {
        throw new ApiError(400, "failed to create log");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, log, "log created successfully"));
});

const GetAllLogs = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skipNum = (pageNum - 1) * limitNum;

    if (!userId) {
        throw new ApiError(400, "user id is required");
    }
    if (isNaN(pageNum) || isNaN(limitNum)) {
        throw new ApiError(400, "invalid page or limit");
    }
    if (pageNum < 1 || limitNum < 1) {
        throw new ApiError(400, "page and limit must be greater than 0");
    }

    const logs = await Log.find({ owner: userId })
        .skip(skipNum)
        .limit(limitNum)
        .sort({ createdAt: 1 })
        .lean();

    if (!logs) {
        throw new ApiError(400, "failed to get all logs");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, logs, "logs fetched successfully"));
});

const MarkLogCompleted = asyncHandler(async (req, res) => {
    const { logId } = req.params;

    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    const completedDate = Date.now();
    //if log already marked as completed then throw error

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //
        //check if log already marked
        const log = await Log.findOne(
            {
                _id: logId,
                completedAt: { $exists: true },
            },
            null,
            { session },
        ).lean();

        if (log) {
            throw new ApiError(400, "log already had been marked as completed");
        }

        // else mark log as completed
        const markedLog = await Log.findByIdAndUpdate(
            logId,
            {
                $set: {
                    completedAt: completedDate,
                },
            },
            {
                returnDocument: "after",
                session: session,
            },
        ).lean();

        if (!markedLog) {
            throw new ApiError(404, "log not found");
        }

        const totalSets = await Log.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(logId),
                },
            },
            {
                $lookup: {
                    from: "exercises",
                    localField: "exercises",
                    foreignField: "_id",
                    as: "exercises",
                },
            },
            {
                $addFields: {
                    noOfSets: {
                        $sum: {
                            $map: {
                                input: "$exercises",
                                as: "ex",
                                in: { $size: { $ifNull: ["$$ex.sets", []] } },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    noOfSets: 1,
                },
            },
        ]).session(session);

        // add log to previous workouts of user
        const prevWorkout = await CompletedWorkout.create(
            [
                {
                    owner: req?.user?._id,
                    name: markedLog?.logName,
                    muscleGroup: markedLog?.muscleGroup,
                    noOfSets: totalSets?.[0]?.noOfSets,
                    exercises: markedLog?.exercises,
                },
            ],
            { session },
        );

        if (!prevWorkout) {
            throw new ApiError(
                400,
                "failed add log to the previous workouts of user",
            );
        }

        // add activity
        const start = new Date().setUTCHours(0, 0, 0, 0);
        const end = new Date().setUTCHours(23, 59, 59, 999);

        // if we have don't an activity in the same day create a new one
        const isActiveDay = await Activity.findOne({
            createdAt: { $gte: start, $lte: end },
        });

        if (!isActiveDay) {
            const newActivity = await Activity.create(
                [
                    {
                        owner: markedLog?.owner,
                    },
                ],
                { session },
            );
            if (!newActivity) {
                throw new ApiError(500, "failed to create activity");
            }
        }
        await session.commitTransaction();
        return res
            .status(200)
            .json(new ApiResponse(200, markedLog, "log marked as completed"));
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
});

const GetLogWithId = asyncHandler(async (req, res) => {
    const { logId } = req.params;
    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    const log = await Log.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(logId),
            },
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
                            as: "sets",
                        },
                    },
                ],
            },
        },
    ]);

    if (!log || !log.length) {
        throw new ApiError(400, "log not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, log[0], "log fetched successfully"));
});

const UpdateLog = asyncHandler(async (req, res) => {
    const { logId } = req.params;
    const { logName } = req.body;
    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    const log = await Log.findByIdAndUpdate(
        logId,
        {
            $set: {
                logName: logName,
            },
        },
        {
            returnDocument: "after",
        },
    ).lean();

    if (!log) {
        throw new ApiError(400, "log not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, log, "log updated successfully"));
});

const DeleteLog = asyncHandler(async (req, res) => {
    const { logId } = req.params;
    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //get log and populate the exercises
        const log = await Log.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(logId),
                },
            },
            {
                $lookup: {
                    from: "exercises",
                    localField: "exercises",
                    foreignField: "_id",
                    as: "exercises",
                },
            },
        ]).session(session);

        if (!log || !log.length) {
            throw new ApiError(400, "log not found");
        }
        //delete all sets all exercises of user
        if (log[0]?.exercises?.sets?.length) {
            try {
                const allsets = log[0]?.exercises?.sets;
                allsets.forEach(
                    async (set) =>
                        await Set.findByIdAndDelete(set, { session }).lean(),
                );
            } catch (err) {
                throw new ApiError(500, "failed to delete sets");
            }
        }
        if (log[0]?.exercises?.length) {
            try {
                const allExercises = log[0]?.exercises;
                allExercises.forEach(
                    async (ex) =>
                        await Exercise.findByIdAndDelete(ex?._id, {
                            session,
                        }).lean(),
                );
            } catch (err) {
                throw new ApiError(500, "failed to delete exercises");
            }
        }
        //finally delete log
        const deletedLog = await Log.findByIdAndDelete(logId, {
            session,
        }).lean();
        if (!deletedLog) {
            throw new ApiError(500, "failed to delete log");
        }
        await session.commitTransaction();
        return res
            .status(200)
            .json(new ApiResponse(200, log[0], "log deleted successfully"));
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
});

const DuplicateLog = asyncHandler(async (req, res) => {
    const { logId } = req.params;
    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    const session = await mongoose.startSession();
    let newLog;
    try {
        session.startTransaction();
        const log = await Log.findById(logId, null, { session }).lean();
        if (!log) {
            throw new ApiError(404, "log not found");
        }
        const {
            _id,
            __v,
            completedAt,
            createdAt,
            updatedAt,
            exercises,
            ...copy
        } = log;
        newLog = await Log.create([copy], { session });
        if (!newLog[0]) {
            throw new ApiError(500, "failed to create log");
        }
        await Promise.all(
            exercises.map(async (e) => {
                const exercise = await Exercise.findById(e._id, null, {
                    session,
                }).lean();
                const {
                    _id,
                    __v,
                    createdAt,
                    updatedAt,
                    sets,
                    ...exerciseCopy
                } = exercise;

                exerciseCopy.logId = newLog[0]?._id;

                const newExercise = await Exercise.create([exerciseCopy], {
                    session,
                });
                if (!newExercise[0]) {
                    throw new ApiError(500, "failed to create exercise copies");
                }
                //
                //add exercise to log
                const updatedLog = await Log.findByIdAndUpdate(
                    newLog[0]?._id,
                    { $push: { exercises: newExercise[0]?._id } },
                    { returnDocument: "after", runValidators: true, session },
                ).lean();
                if (!updatedLog) {
                    throw new ApiError(500, "failed to add exercise to log");
                }

                await Promise.all(
                    sets.map(async (s) => {
                        const set = await Set.findById(
                            s._id,
                            null,
                            session,
                        ).lean();
                        const {
                            _id,
                            __v,
                            createdAt,
                            updatedAt,
                            completed,
                            ...setCopy
                        } = set;
                        setCopy.exerciseId = newExercise[0]?._id;
                        setCopy.completed = false;
                        setCopy.isPr = false;
                        const newSet = await Set.create([setCopy], { session });
                        if (!newSet[0]) {
                            throw new ApiError(
                                500,
                                "failed to create sets copies",
                            );
                        }
                        //add set to the exercise
                        const updatedExercise =
                            await Exercise.findByIdAndUpdate(
                                newExercise[0]?._id,
                                {
                                    $push: {
                                        sets: newSet[0]?._id,
                                    },
                                },
                                {
                                    returnDocument: "after",
                                    runValidators: true,
                                    session,
                                },
                            ).lean();
                        if (!updatedExercise) {
                            throw new ApiError(
                                500,
                                "failed to add set to exercise",
                            );
                        }
                    }),
                );
            }),
        );

        const dupelog = await Log.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(newLog[0]?._id),
                },
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
                                as: "sets",
                            },
                        },
                    ],
                },
            },
        ]).session(session);

        if (!dupelog || !dupelog.length) {
            throw new ApiError(400, "log not found");
        }
        await session.commitTransaction();
        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    dupelog[0],
                    "duplicate log created successfully",
                ),
            );
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
});

export {
    CreateLog,
    GetAllLogs,
    GetLogWithId,
    MarkLogCompleted,
    UpdateLog,
    DeleteLog,
    DuplicateLog,
};
