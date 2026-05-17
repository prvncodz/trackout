import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Set from "../models/set.model.js"
import CreateSetSchema from "../schemas/set.schema.js";


const CreateSet = asyncHandler(async (req, res) => {
    const { exerciseId } = req.params
    const { setNo, weight, reps, rest } = req.body
    if (!exerciseId) {
        throw new ApiError(400, "exercise id is required")
    }

    const allItems = { exerciseId, setNo, weight, reps }
    if (rest) allItems.rest = rest
    const input = CreateSetSchema.safeParse(allItems)
    if (!input.success) {
        throw new ApiError(400, input.error?.issues?.[0]?.message)
    }
    const createdSet = await Set.create(allItems)
    if (!createdSet) {
        throw new ApiError(500, "failed to create set")
    }
    return res
        .status(201)
        .json(new ApiResponse(201, createdSet, "set created successfully"))
})

const GetAllSetsOfExercise = asyncHandler(async (req, res) => {
    const { exerciseId } = req.params
    if (!exerciseId) {
        throw new ApiError(400, "exercise id is required")
    }
    const sets = await Set.find({ exerciseId })
    if (!sets.length) {
        throw new ApiError(500, "unable to get sets of this exercise")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, sets, "sets of exercise fetched successfully"))
})

const DeleteSet = asyncHandler(async (req, res) => {
    const { setId } = req.params
    if (!setId) {
        throw new ApiError(400, "set id is required")
    }
    const deleted = await Set.findByIdAndDelete(setId)
    if (!deleted) {
        throw new ApiError(500, "failed to delete set")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, deleted, "set deleted successfully"))
})

export { GetAllSetsOfExercise, DeleteSet ,CreateSet}
