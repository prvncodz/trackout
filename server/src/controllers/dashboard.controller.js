import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js"

const DashBoardController = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "user not found")
    }
    const DashboardStats = await User.aggregate([
        //get the user doc by userid
        {
            $match: {
                _id: user?._id,
            },
        },
        // get the completedworkouts docs
        {
            $lookup: {
                from: "completedworkouts",
                localField: "_id",
                foreignField: "owner",
                as: "completedWorkouts",
            },
        },
        // get all active days docs
        {
            $lookup: {
                from: "activities",
                localField: "_id",
                foreignField: "owner",
                as: "activeDays",
            },
        },
        // sort the active days feilds
        {
            $sortArray: {
                input: "$activeDays",
                sortBy: { createdAt: -1 },
            },
        },
        // calculate user's workout consistency
        {
            $reduce: {
                input: "$activeDays",
                initialValue: { streak: 0, started: false, broken: false, prevDate: null },
                in: {
                    // in activedates if the streak gets broken return the streak
                    $cond: {
                        if: "$$value.broken",
                        then: "$$value",
                        else: {
                            //in activedates check if it starts with either today or yesterday. return streak 0 and broken true flag if not. if it starts with today or yesterday we increase the streak and start iterating further 
                            $cond: {
                                if: "$$value.started",
                                then: {
                                    $cond: {
                                        if: {// previous day -1 = current day then increase the streak else we found a gap so return the streak
                                            $eq: [
                                                { $dateTrunc: { date: { $dateSubtract: { startDate: "$$value.prevDate", unit: "day", amount: 1 } }, unit: "day" } },
                                                { $dateTrunc: { date: "$$this", unit: "day" } },
                                            ]
                                        },
                                        then: { streak: { $add: ["$$value.streak", 1] }, started: true, broken: false, prevDate: "$$this" },
                                        else: { streak: "$$value.streak", started: false, broken: true, prevDate: null },
                                    },
                                },
                                else: {
                                    $cond: {
                                        if: {
                                            $or: [
                                                {//today
                                                    $eq: [
                                                        { $dateTrunc: { date: "$$this", unit: "day" } },
                                                        { $dateTrunc: { date: "$$NOW", unit: "day" } },
                                                    ]
                                                },
                                                {//yesterday
                                                    $eq: [
                                                        { $dateTrunc: { date: "$$this", unit: "day" } },
                                                        { $dateTrunc: { date: { $dateSubtract: { startDate: "$$NOW", unit: "day", amount: 1 } }, unit: "day" } },
                                                    ]
                                                }
                                            ]
                                        },
                                        then: { streak: 1, started: true, broken: false, prevDate: "$$this" },
                                        else: { streak: 0, started: false, broken: true, prevDate: null },
                                    },
                                },
                            },
                        },
                    },
                },
                as: "streakCalc",
            },
        },
        {
            //all user's sets with ispr true 
            $lookup: {
                from: "sets",
                localField: "_id",
                foreignField: "owner",
                pipeline: [
                    {
                        $match: {
                            isPr: true
                        }
                    }
                ],
                as: "allPrs"
            }
        },
        // recent 5 workouts
        {
            $lookup: {
                from: "completedworkouts",
                localField: "_id",
                foreignField: "owner",
                pipeline: [
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },
                    {
                        $limit: 5
                    }
                ],
                as: "recentWorkouts"
            }
        },
        // add extra feilds to the docs
        {
            $addFields: {
                totalWorkouts: { $size: "$completedWorkouts" },
                totalActiveDays: { $size: "$activeDays" },
                consistencyStreak: "$streakCalc.streak",
                totalPrs: { $size: "allPrs" },
                activeDates: {
                    $map: {
                        input: "$activeDays",
                        as: "day",
                        in: "$$day.createdAt"
                    }
                },
                chartStats: {

                },
                recentWorkouts: "$recentWorkouts",
            },
        },
        // project the wanted dashboard stats of user
        {
            $project: {
                totalWorkouts: 1,
                totalActiveDays: 1,
                consistencyStreak: 1,
                totalPrs: 1,
                activeDates: 1,
                chartStats: 1,
                recentWorkouts: 1,
            },
        },
    ])

    if (!DashboardStats) {
        throw new ApiError(500, "dashboard stats not found")
    }
    return res.status(200).json(new ApiResponse(200, DashboardStats, "dashboard stats fetched successfully"))
})

export { DashBoardController }

