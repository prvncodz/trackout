import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Set from "../models/set.model.js"
import CreateSetSchema from "../schemas/set.schema.js";
import Exercise from "../models/exercise.model.js";
import Activity from "../models/activity.model.js"

const CreateSet = asyncHandler(async (req, res) => {
    const { exerciseId } = req.params
    const user = req.user
    const { setNo, weight, reps, rest } = req.body
    if (!exerciseId) {
        throw new ApiError(400, "exercise id is required")
    }

    let allItems = { exerciseId, setNo, weight, reps, owner: user?._id }
    if (rest) allItems.rest = rest

    //validate
    const input = CreateSetSchema.safeParse(allItems)
    if (!input.success) {
        throw new ApiError(400, input.error?.issues?.[0]?.message, input.error?.issues?.[0])
    }
    //create set
    const createdSet = await Set.create(allItems)
    if (!createdSet) {
        throw new ApiError(500, "failed to create set")
    }
    //add set to the exercise
    const updatedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        {
            $push: {
                sets: createdSet?._id
            }
        },
        { returnDocument: "after", runValidators: true }
    ).lean()
    if (!updatedExercise) {
        throw new ApiError(500, "failed to add set to exercise")
    }
    session.commitTransaction();
    return res
        .status(201)
        .json(new ApiResponse(201, createdSet, "set created successfully"))
})



const DeleteSet = asyncHandler(async (req, res) => {
    const { setId, exerciseId } = req.params
    if (!setId || !exerciseId) {
        throw new ApiError(400, "set id and exercise id is required")
    }

    const UpdatedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        {
            $pull: {
                sets: setId
            }
        },
        { returnDocument: "after", runValidators: true }
    ).lean()
    if (!UpdatedExercise) {
        throw new ApiError(500, "failed to delete set from exercise")
    }


    const deleted = await Set.findByIdAndDelete(setId).lean()
    if (!deleted) {
        throw new ApiError(500, "failed to delete set")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, deleted, "set deleted successfully"))
})

const UpdateSet = asyncHandler(async (req, res) => {
    const { setId } = req.params
    const { weight, reps, rest } = req.body

    if (!setId) {
        throw new ApiError(400, "set id is required")
    }
    if (!req.body) {
        throw new ApiError(400, "no fields to update")
    }
    let fieldsToUpdate = {}
    if (weight) fieldsToUpdate.weight = weight
    if (reps) fieldsToUpdate.reps = reps
    if (rest) fieldsToUpdate.rest = rest

    if (!fieldsToUpdate || fieldsToUpdate?.length === 0) {
        throw new ApiError(400, "no fields to update")
    }

    const updatedSet = await Set.findByIdAndUpdate(setId, { $set: fieldsToUpdate }, { returnDocument: "after", runValidators: true }).lean()
    if (!updatedSet) {
        throw new ApiError(500, "failed to update set")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updatedSet, "set updated succccessfully"))
})

const ToggleSetAsCompleted = asyncHandler(async (req, res) => {
    const { setId } = req.params
    const { isPr } = req.body
    if (!setId) {
        throw new ApiError(400, "set id is required")
    }
    const set = await Set.findById(setId)
    if (!set) {
        throw new ApiError(500, "set not found")
    }
    set.completed = !set.completed
    if (isPr) set.isPr = !set.isPr
    await set.save()
    if (set.completed) {
        const todaysDate = Date.now()
        const isActiveDay = await Activity.findOne({ createdAt: todaysDate })
        if (!isActiveDay) {
            const newActivity = await Activity.create({
                owner: set?.owner,
            })
            if (!newActivity) {
                throw new ApiError(500, "failed to create activity")
            }
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, set, "set's completed status toggled successfully"))
})

export { DeleteSet, CreateSet, UpdateSet, ToggleSetAsCompleted }
