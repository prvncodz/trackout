import Exercise from "../models/exercise.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import Log from "../models/log.model";
import Set from "../models/set.model";
import mongoose from "mongoose";
import { Request, Response } from "express";

const AddExerciseToLog = asyncHandler(async (req: Request, res: Response) => {
    const logId = req.params.logId;
    const { name, muscleGroup } = req.body;
    if (!logId) {
        throw new ApiError(400, "log id is required");
    }
    if (!name || !muscleGroup) {
        throw new ApiError(400, "exercise name and muscle group is required");
    }
    //create the exercise
    const exercise = await Exercise.create({
        logId: (logId as string),
        name,
        muscleGroup,
    });

    if (!exercise) {
        throw new ApiError(500, "failed to add exercise to log");
    }
    //add exercise to log
    const updatedLog = await Log.findByIdAndUpdate(
        logId,
        { $push: { exercises: exercise?._id } },
        { returnDocument: "after", runValidators: true },
    ).lean();
    if (!updatedLog) {
        throw new ApiError(500, "failed to add exercise to log");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                exercise,
                "exercises added to log successfully",
            ),
        );
});

const UpdateExercise = asyncHandler(async (req: Request, res: Response) => {
    const { exerciseId } = req.params;
    const { name, muscleGroup, note } = req.body;
    let feildsToUpdate: any = {};
    if (!name && !muscleGroup && !note) {
        throw new ApiError(400, "no feilds to update");
    }
    if (name) feildsToUpdate.name = name;
    if (muscleGroup) feildsToUpdate.muscleGroup = muscleGroup;
    if (note) feildsToUpdate.note = note;

    const updatedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        { $set: feildsToUpdate },
        { returnDocument: "after", runValidators: true },
    ).lean();
    if (!updatedExercise) {
        throw new ApiError(500, "failed to update exercise");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedExercise,
                "exercise updated succccessfully",
            ),
        );
});

const DeleteExerciseFromLog = asyncHandler(async (req: Request, res: Response) => {
    const { exerciseId } = req.params;
    if (!exerciseId) {
        throw new ApiError(400, "log id and exercise id is required");
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const exercise = await Exercise.findById(exerciseId, null, {
            session,
        }).lean();

        if (!exercise) {
            throw new ApiError(500, "failed to delete exercise");
        }

        if (exercise?.sets?.length > 0) {
            try {
                const allsets = exercise?.sets;
                allsets.forEach(
                    async (set) =>
                        await Set.findByIdAndDelete(set, { session }).lean(),
                );
            } catch (err) {
                throw new ApiError(500, "failed to delete sets");
            }
        }

        const UpdatedLog = await Log.findByIdAndUpdate(
            exercise?.logId,
            {
                $pull: {
                    exercises: exerciseId,
                },
            },
            {
                returnDocument: "after",
                session: session,
            },
        ).lean();

        if (!UpdatedLog) {
            throw new ApiError(500, "failed to delete exercise from log");
        }

        const deleted = await Exercise.findByIdAndDelete(exerciseId, {
            session,
        }).lean();
        if (!deleted) {
            throw new ApiError(500, "failed to delete exercise");
        }
        await session.commitTransaction();
        return res
            .status(200)
            .json(
                new ApiResponse(200, deleted, "exercise deleted successfully"),
            );
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
});

export { AddExerciseToLog, UpdateExercise, DeleteExerciseFromLog };
