import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";


const GetAllExercises = asyncHandler(async (req, res) => {
    const { logId } = req.params
    if (!logId) {
        throw new ApiError(400, "log id is required")
    }
    const allExercises = await Exercise.findById(logId)

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
    if (!name) {
        throw new ApiError(400, "exercise name is required")
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
    // get exercise
    // 
    const { exerciseId } = req.params

})
export { AddExerciseToLog, GetAllExercises }
