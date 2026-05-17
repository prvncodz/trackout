import Exercise from "../models/exercise.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const GetAllExercises = asyncHandler(async (req, res) => {
    const { logId } = req.params
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    const allExercises = await Exercise.find({ logId })

    if (!allExercises) {
        throw new ApiError(500, "failed to get all exercises")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, allExercises, "all exercises"))
})

const AddExerciseToLog = asyncHandler(async (req, res) => {
    const { logId } = req.params
    const { name, muscleGroup } = req.body
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    if (!name || !muscleGroup) {
        throw new ApiError(400, "exercise name and muscle group is required")
    }

    const exercise = await Exercise.create({
        logId,
        name,
        muscleGroup
    })
    if (!exercise) {
        throw new apiError(500, "failed to add exercise to log");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, exercise, "exercises added to log successfully"))
})

const UpdateExercise = asyncHandler(async (req, res) => {
    const { exerciseId } = req.params
    const { name, muscleGroup, note } = req.body
    let feildsToUpdate = {}
    if (!name && !muscleGroup && !note) {
        throw new ApiError(400, "no feilds to update")
    }
    if (name) feildsToUpdate.name = name
    if (muscleGroup) feildsToUpdate.muscleGroup = muscleGroup
    if (note) feildsToUpdate.note = note

    const updatedExercise = await Exercise.findByIdAndUpdate(exerciseId, { $set: feildsToUpdate }, { returnDocument: "after", runValidators: true })
    if (!updatedExercise) {
        throw new ApiError(500, "failed to update exercise")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updatedExercise, "exercise updated succccessfully"))
})

const DeleteExerciseFromLog = asyncHandler(async (req, res) => {

    const { exerciseId } = req.params
    if (!exerciseId) {
        throw new ApiError(400, "log id and exercise id is required")
    }

    const deleted = await Exercise.findByIdAndDelete(exerciseId)

    if (!deleted) {
        throw new ApiError(500, "failed to delete exercise")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deleted, "exercise deleted successfully"))
})

export { AddExerciseToLog, GetAllExercises, UpdateExercise, DeleteExerciseFromLog }
