import User from "../models/user.model.js"
import Set from "../models/set.model.js"
import Exercise from "../models/exercise.model.js"
import Log from "../models/log.model.js"
import CompletedWorkout from "../models/completedWorkouts.model.js"
import Activity from "../models/activity.model.js"
import { userSignUpSchema, userSignInSchema } from "../schemas/user.schemas.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { DeleteFromCloud, UploadToCloud } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const SignUpUser = asyncHandler(async (req, res) => {
    const { fullname, email, height, weight, password } = req.body
    if (!fullname || !email || !height || !weight) {
        throw new ApiError(400, "all field are required")
    }
    if (!password) {
        throw new ApiError(400, "password is required")
    }
    const validationResult = userSignUpSchema.safeParse({ fullname, email, height, weight, password });
    if (!validationResult.success) {
        throw new ApiError(400, result?.error?.issues?.[0]?.message)
    }

    const userExists = await User.findOne({ fullname }).lean();
    if (userExists) {
        throw new ApiError(400, "user with this fullname already exists")
    }

    const user = await User.create({
        fullname,
        email,
        height,
        weight,
        password
    })

    const createdUser = await User.findById(user?._id).lean().select("-password")

    if (!createdUser) {
        console.error("user creation failed");
    }


    return res
        .status(201)
        .json(new ApiResponse(
            201,
            createdUser,
            "user registered successfully"
        ))
})

const SignInUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "email and password are required fields")
    }

    const validationResult = await userSignInSchema.safeParse({ email, password })
    if (!validationResult.success) {
        throw new ApiError(400, "invalid input credentials")
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "user not found")
    }

    const passwordIsCorrect = await user.isPasswordCorrect(password)
    if (!passwordIsCorrect) {
        throw new ApiError(401, "wrong password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id);
    const loggedUser = await User.findById(user?._id).lean().select("-password -refreshToken")

    if (!loggedUser) {
        throw new ApiError(401, "user not found")
    }
    const AtOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000, //cookie's max age is 1 hour
    };
    const RtOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 3 * 24 * 60 * 60 * 1000, //cookie's max age is 3 days
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, AtOptions)
        .cookie("refreshToken", refreshToken, RtOptions)
        .json(new ApiResponse(
            200,
            loggedUser,
            "user logged successfully"))

})

const LogOutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "user logged out successfully"))
})


const CurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const UpdateAccessAndRefreshTokens = asyncHandler(async (req, res) => {

    const token = req.cookies?.refreshToken;
    if (!token) {
        throw new ApiError(400, "invalid refresh token")
    }
    const decodedToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(400, "unauthorized request")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(decodedToken?._id);
    const loggedUser = await User.findById(decodedToken?._id).lean().select("-password -refreshToken")

    if (!loggedUser) {
        throw new ApiError(401, "user not found")
    }
    const AtOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000, //cookie's max age is 1 hour
    };
    const RtOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 3 * 24 * 60 * 60 * 1000, //cookie's max age is 3 days
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, AtOptions)
        .cookie("refreshToken", refreshToken, RtOptions)
        .json(new ApiResponse(
            200,
            loggedUser,
            "tokens updated successfully"
        ))
})


const UpdateUserAvatar = asyncHandler(async (req, res) => {
    const filePath = req.file?.path
    if (!filePath) {
        throw new ApiError(400, "file doesn't exists")
    }
    const avatar = await UploadToCloud(filePath)
    if (!avatar) {
        throw new ApiError(401, "clodinary upload of avatar failed");
    }
    const user = req.user;
    const fileToBeDeleted = user?.avatar?.public_id;
    const updateAvatar = await User.findByIdAndUpdate(
        user?._id,
        {
            $set: {
                avatar: {
                    public_id: avatar?.public_id,
                    url: avatar?.secure_url,
                },
            },
        },
        { returnDocument: 'after' }
    ).lean().select("-password -refreshToken");

    if (fileToBeDeleted) {
        try {
            await DeleteFromCloud(fileToBeDeleted);
        } catch (err) {
            throw new ApiError(504, "error while deleting file From Cloud");
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateAvatar, "avatar updated successfully"));
})


const UpdateAccountInfo = asyncHandler(async (req, res) => {
    const { fullname, email, height, weight } = req.body;
    const UpdatedFields = {};
    if (fullname) {
        UpdatedFields.fullName = fullname;
    }
    if (email) {
        UpdatedFields.email = email;
    }
    if (height) {
        UpdatedFields.height = height;
    }
    if (weight) {
        UpdatedFields.weight = weight;
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: UpdatedFields,
        },
        {
            returnDocument: 'after',
        },
    ).lean().select("-password -refershToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "information updated successfully"));
});


const UserProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "user is undefined")
    }
    const userProfile = await User.aggregate([
        {
            $match: {
                _id: user?._id
            }
        },
        {
            $lookup: {
                from: "activedates",
                localField: "_id",
                foreignField: "user",
                as: "activeDates"
            }
        },
        {
            $addFields: {
                activeDates: {
                    $map: {
                        input: "$activeDates",
                        as: "day",
                        in: "$$day.createdAt"
                    }
                }
            }
        },
    ])
    if (!userProfile || !userProfile.length) {
        throw new ApiError(400, "user not found")
    }
    return res.status(200).json(new ApiResponse(200, userProfile[0], "user profile found successfully"))
})

const DeleteUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "user is undefined")
    }
    const [
        allSetsDeleted,
        allExercisesDeleted,
        allLogsDeleted,
        allWorkoutsDeleted,
        allActiveDatesDeleted,
    ] = await Promise.all([
        Set.deleteMany({ owner: user?._id }),
        Exercise.deleteMany({ owner: user?._id }),
        Log.deleteMany({ owner: user?._id }),
        CompletedWorkout.deleteMany({ owner: user?._id }),
        Activity.deleteMany({ user: user?._id }),
    ])

    if (
        !allSetsDeleted.acknowledged ||
        !allExercisesDeleted.acknowledged ||
        !allLogsDeleted.acknowledged ||
        !allWorkoutsDeleted.acknowledged ||
        !allActiveDatesDeleted.acknowledged
    ) {
        throw new ApiError(500, "Error while deleting user data")
    }

    const userDeleted = await User.findByIdAndDelete(user?._id)
    if (!userDeleted) {
        throw new ApiError(404, "User not found or already deleted")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, userDeleted, "user deleted successfully"))
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
})

export {
    SignUpUser,
    SignInUser,
    LogOutUser,
    CurrentUser,
    UpdateAccessAndRefreshTokens,
    UpdateUserAvatar,
    UpdateAccountInfo,
    UserProfile,
    DeleteUser
}
