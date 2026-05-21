import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const DashBoardController = asyncHandler(async (req, res) => {
    // get user
    // make a pipeline which will have total active days,consistency streak,total prs,total workouts,active dates, recent logs,chart stats
    // return all stats if found 
    const user = req.user
    if (!user) {
        throw new ApiError(400, "user not found")
    }
    const DashboardStats = await User.aggregate([
        {
            $match: {
                _id: user?._id
            }
        },
        {
            $lookup: {
                from: "completedworkouts",
                localField: "_id",
                foreignField: "owner",
                as: "completedWorkouts"
            }
        },
        {
            $lookup: {
                from: "activities",
                localField: "_id",
                foreignField: "owner",
                as: "activeDays"
            }
        },
        {
            $addFields: {
                totalWorkouts: { $size: "$completedWorkouts" },
                totalActiveDays: { $size: "$activeDays" },
                consistencystreak: {},
                activeDates: {
                    $map: {
                        input: "$activeDays",
                        as: "day",
                        in: "$$day.createdAt"
                    }
                }
            }
        }
    ])

    if (!DashboardStats) {
        throw new ApiError(500, "dashboard stats not found")
    }
    return res.status(200).json(new ApiResponse(200, DashboardStats, "dashboard stats fetched successfully"))
})

export { DashBoardController }

