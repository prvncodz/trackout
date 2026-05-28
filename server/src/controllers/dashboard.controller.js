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
                pipeline: [
                    {
                        // sort the active days feilds
                        $sort: {
                            createdAt: -1
                        }
                    }
                ],
                as: "activeDays",
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
                    // sort decending(recent first)
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },
                    // limit by 5 docs
                    {
                        $limit: 5
                    },
                    {
                        $addFields: {
                            timeAgo: {
                                $let: {
                                    vars: {
                                        dif: {
                                            $dateDiff: {
                                                startDate: "$createdAt",
                                                endDate: "$$NOW",
                                                unit: "millisecond"
                                            }
                                        }
                                    },
                                    in: {
                                        $let: {
                                            vars: {
                                                seconds: { $floor: { $divide: ["$$dif", 1000] } },
                                                minutes: { $floor: { $divide: ["$$dif", 60000] } },
                                                hours: { $floor: { $divide: ["$$dif", 3600000] } },
                                                days: { $floor: { $divide: ["$$dif", 86400000] } },
                                                months: { $floor: { $divide: [{ $floor: { $divide: ["$$dif", 86400000] } }, 30] } },
                                                years: { $floor: { $divide: [{ $floor: { $divide: ["$$dif", 86400000] } }, 365] } }
                                            },
                                            in: {
                                                $switch: {
                                                    branches: [
                                                        {
                                                            case: { $gt: ["$$years", 0] },
                                                            then: {
                                                                $concat: [
                                                                    { $toString: "$$years" },
                                                                    { $cond: [{ $gt: ["$$years", 1] }, " years", " year"] }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            case: { $gt: ["$$months", 0] },
                                                            then: {
                                                                $concat: [
                                                                    { $toString: "$$months" },
                                                                    { $cond: [{ $gt: ["$$months", 1] }, " months", " month"] }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            case: { $gt: ["$$days", 0] },
                                                            then: {
                                                                $concat: [
                                                                    { $toString: "$$days" },
                                                                    { $cond: [{ $gt: ["$$days", 1] }, " days", " day"] }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            case: { $gt: ["$$hours", 0] },
                                                            then: {
                                                                $concat: [
                                                                    { $toString: "$$hours" },
                                                                    { $cond: [{ $gt: ["$$hours", 1] }, " hours", " hour"] }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            case: { $gt: ["$$minutes", 0] },
                                                            then: {
                                                                $concat: [
                                                                    { $toString: "$$minutes" },
                                                                    { $cond: [{ $gt: ["$$minutes", 1] }, " minutes", " minute"] }
                                                                ]
                                                            }
                                                        }
                                                    ],
                                                    default: {
                                                        $concat: [
                                                            { $toString: "$$seconds" },
                                                            { $cond: [{ $gt: ["$$seconds", 1] }, " seconds", " second"] }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }],
                as: "recentWorkouts"
            }
        },
        // calculate chart stats
        {
            $lookup: {
                from: "completedworkouts",
                localField: "_id",
                foreignField: "owner",
                // perform calculations in sub-pipelines
                pipeline: [
                    // populate exercises of completedworkouts
                    {
                        $lookup: {
                            from: "exercises",
                            let: { userId: "$owner", createdAt: "$createdAt", exerciseIds: "$exercises" },
                            pipeline: [
                                // get the exercises where user is the owner and musclegroup is chest, back or legs
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $in: ["$_id", "$$exerciseIds"] },
                                                { $in: ["$muscleGroup", ["chest", "back", "legs"]] },
                                            ],
                                        },
                                    },
                                },
                                // populate sets of the exercises found above
                                {
                                    $lookup: {
                                        from: "sets",
                                        localField: "sets",
                                        foreignField: "_id",
                                        as: "sets"
                                    }
                                },
                                // unwind the sets to calculate the estimated 1repmax.
                                { $unwind: "$sets" },
                                // for every set found above, calculate 1 rep max.
                                {
                                    $addFields: {
                                        estimated1RepMax: {
                                            $multiply: [
                                                "$sets.weight",
                                                { $add: [1, { $divide: ["$sets.reps", 30] }] },
                                            ]
                                        },
                                    },
                                },
                                // after adding the estimated 1 rep max to evey set, we group the exercises by musclegroup and get the max of estimated1RepMax of all the sets
                                {
                                    $group: {
                                        _id: {
                                            muscleGroup: "$muscleGroup"
                                        },
                                        best1RepMax: {
                                            $max: "$estimated1RepMax"
                                        },
                                        date: { $max: "$$createdAt" }
                                    }
                                },
                                // now we will get the average of the best1RepMax of every musclegroup
                                {
                                    $group: {
                                        _id: "$date",
                                        average1RepMax: {
                                            $avg: "$best1RepMax"
                                        },
                                        date: { $max: "$date" }
                                    }
                                },
                                // now we sort the docs according to date
                                { $sort: { "_id": -1 } },
                                // project only date and estimated1RepMax average for a day
                                {
                                    $project: {
                                        date: 1,
                                        average1RepMax: 1,
                                        _id: 0,
                                    },
                                },
                            ],
                            as: "Stats"
                        },
                    },
                    // get the object out of the array
                    { $unwind: "$Stats" },

                    {
                        $addFields: {
                            chartStats: "$Stats",
                        }
                    },

                    {
                        $project: {
                            chartStats: 1,
                            _id: 0
                        }
                    }
                ],
                as: "userCompletedWorkouts"
            }
        },
        // add extra feilds to the docs
        {
            $addFields: {
                totalWorkouts: { $size: "$completedWorkouts" },
                totalActiveDays: { $size: "$activeDays" },
                consistencyStreak: {
                    $let: {
                        vars: {
                            //store result object in varaible
                            result: {
                                // calculate user's workout consistency
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
                                                                    { $dateTrunc: { date: "$$this.createdAt", unit: "day" } },
                                                                ]
                                                            },
                                                            then: { streak: { $add: ["$$value.streak", 1] }, started: true, broken: false, prevDate: "$$this.createdAt" },
                                                            else: { streak: "$$value.streak", started: false, broken: true, prevDate: null },
                                                        },
                                                    },
                                                    else: {
                                                        $cond: {
                                                            if: {
                                                                $or: [
                                                                    {//today
                                                                        $eq: [
                                                                            { $dateTrunc: { date: "$$this.createdAt", unit: "day" } },
                                                                            { $dateTrunc: { date: "$$NOW", unit: "day" } },
                                                                        ]
                                                                    },
                                                                    {//yesterday
                                                                        $eq: [
                                                                            { $dateTrunc: { date: "$$this.createdAt", unit: "day" } },
                                                                            { $dateTrunc: { date: { $dateSubtract: { startDate: "$$NOW", unit: "day", amount: 1 } }, unit: "day" } },
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            // if today or yesterday then we continue counting streak or quit
                                                            then: { streak: 1, started: true, broken: false, prevDate: "$$this.createdAt" },
                                                            else: { streak: 0, started: false, broken: true, prevDate: null },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        in: "$$result.streak"
                    },
                },
                totalPrs: { $size: "$allPrs" },
                chartStats: "$userCompletedWorkouts.chartStats",
                recentWorkouts: "$recentWorkouts",
            },
        },
        // project the wanted dashboard stats of user
        {
            $project: {
                _id: 0,
                totalWorkouts: 1,
                totalActiveDays: 1,
                consistencyStreak: 1,
                totalPrs: 1,
                chartStats: 1,
                recentWorkouts: 1,
            },
        },
    ])

    if (!DashboardStats || !DashboardStats.length) {
        throw new ApiError(500, "dashboard stats not found")
    }
    return res.status(200).json(new ApiResponse(200, DashboardStats[0], "dashboard stats fetched successfully"))
})

export { DashBoardController }

