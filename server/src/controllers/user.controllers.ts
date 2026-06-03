import User from "../models/user.model";
import Set from "../models/set.model";
import Exercise from "../models/exercise.model";
import Log from "../models/log.model";
import CompletedWorkout from "../models/completedWorkouts.model";
import Activity from "../models/activity.model";
import { userSignUpSchema, userSignInSchema, UserSignInInput, UserSignUpInput } from "../schemas/user.schemas";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { DeleteFromCloud, UploadToCloud } from "../utils/cloudinary";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import { JwtPayloadWithId } from "../middlewares/auth.middleware";


const generateAccessAndRefreshTokens = async (userId: Types.ObjectId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(500, "user not found")
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error: any) {
        throw new ApiError(500, error.message);
    }
};

const SignUpUser = asyncHandler(async (req: Request, res: Response) => {
    const { fullname, email, height, weight, password }: UserSignUpInput = req.body;

    const validationResult = userSignUpSchema.safeParse({
        fullname,
        email,
        height,
        weight,
        password,
    });

    if (!validationResult.success) {
        throw new ApiError(400, validationResult?.error?.issues?.[0]?.message);
    }

    const userExists = await User.findOne({ fullname }).lean();
    if (userExists) {
        throw new ApiError(400, "user with this fullname already exists");
    }

    const user = await User.create({
        fullname,
        email,
        height,
        weight,
        password,
    });

    const createdUser = await User.findById(user?._id)
        .lean()
        .select("-password");

    if (!createdUser) {
        console.error("user creation failed");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "user registered successfully"),
        );
});

const SignInUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: UserSignInInput = req.body;

    const validationResult = userSignInSchema.safeParse({
        email,
        password,
    });

    if (!validationResult.success) {
        throw new ApiError(400, "invalid input credentials");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "user not found");
    }

    const passwordIsCorrect = await user.isPasswordCorrect(password);
    if (!passwordIsCorrect) {
        throw new ApiError(401, "wrong password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user?._id,
    );

    const loggedUser = await User.findById(user?._id)
        .lean()
        .select("-password -refreshToken");

    if (!loggedUser) {
        throw new ApiError(401, "user not found");
    }
    const AtOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, //cookie's max age is 1 hour
    };
    const RtOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000, //cookie's max age is 3 days
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, AtOptions)
        .cookie("refreshToken", refreshToken, RtOptions)
        .json(new ApiResponse(200, loggedUser, "user logged successfully"));
});

const LogOutUser = asyncHandler(async (req: Request, res: Response) => {
    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const CurrentUser = asyncHandler(async (req: Request, res: Response) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "current user fetched successfully"),
        );
});

const UpdateAccessAndRefreshTokens = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        throw new ApiError(400, "invalid refresh token");
    }
    const decodedToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET as any,
    );
    if (!decodedToken) {
        throw new ApiError(400, "unauthorized request");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        (decodedToken as JwtPayloadWithId)?._id,
    );
    const loggedUser = await User.findById((decodedToken as JwtPayloadWithId)?._id)
        .lean()
        .select("-password -refreshToken");

    if (!loggedUser) {
        throw new ApiError(401, "user not found");
    }
    const AtOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, //cookie's max age is 1 hour
    };
    const RtOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000, //cookie's max age is 3 days
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, AtOptions)
        .cookie("refreshToken", refreshToken, RtOptions)
        .json(new ApiResponse(200, loggedUser, "tokens updated successfully"));
});

const UpdateUserAvatar = asyncHandler(async (req: Request, res: Response) => {
    const filePath = req.file?.path;
    if (!filePath) {
        throw new ApiError(400, "file doesn't exists");
    }
    const avatar = await UploadToCloud(filePath);
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
        { returnDocument: "after" },
    )
        .lean()
        .select("-password -refreshToken");

    if (fileToBeDeleted) {
        try {
            await DeleteFromCloud(fileToBeDeleted);
        } catch (err) {
            throw new ApiError(504, "error while deleting file From Cloud");
        }
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updateAvatar, "avatar updated successfully"),
        );
});

const UpdateAccountInfo = asyncHandler(async (req: Request, res: Response) => {
    const { fullname, email, height, weight } = req.body;
    const UpdatedFields: {
        fullname?: string,
        email?: string,
        height?: number,
        weight?: number
    } = {};
    if (fullname) {
        UpdatedFields.fullname = fullname;
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

    if (
        !UpdatedFields ||
        Object.keys(UpdatedFields).length === 0 
    ) {
        throw new ApiError(400, "nothing to update");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: UpdatedFields,
        },
        {
            returnDocument: "after",
        },
    )
        .lean()
        .select("-password -refershToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "information updated successfully"));
});

const UserActiveDates = asyncHandler(async (req:Request, res:Response) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "user is undefined");
    }
    const userProfile = await User.aggregate([
        {
            $match: {
                _id: user?._id,
            },
        },
        {
            $lookup: {
                from: "activities",
                localField: "_id",
                foreignField: "owner",
                as: "activeDates",
            },
        },
        {
            $addFields: {
                activeDates: {
                    $map: {
                        input: "$activeDates",
                        as: "day",
                        in: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$$day.createdAt",
                            },
                        },
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                activeDates: 1,
            },
        },
    ]);
    if (!userProfile || !userProfile.length) {
        throw new ApiError(400, "user not found");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userProfile[0],
                "fetched user activity successfully",
            ),
        );
});

const DeleteUser = asyncHandler(async (req:Request, res:Response) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "user is undefined");
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const [
            allSetsDeleted,
            allExercisesDeleted,
            allLogsDeleted,
            allWorkoutsDeleted,
            allActiveDatesDeleted,
        ] = await Promise.all([
            Set.deleteMany({ owner: user?._id }, { session }),
            Exercise.deleteMany({ owner: user?._id }, { session }),
            Log.deleteMany({ owner: user?._id }, { session }),
            CompletedWorkout.deleteMany({ owner: user?._id }, { session }),
            Activity.deleteMany({ user: user?._id }, { session }),
        ]);

        if (
            !allSetsDeleted.acknowledged ||
            !allExercisesDeleted.acknowledged ||
            !allLogsDeleted.acknowledged ||
            !allWorkoutsDeleted.acknowledged ||
            !allActiveDatesDeleted.acknowledged
        ) {
            throw new ApiError(500, "Error while deleting user data");
        }

        const userDeleted = await User.findByIdAndDelete(user?._id);
        if (!userDeleted) {
            throw new ApiError(404, "User not found or already deleted");
        }
        await session.commitTransaction();
        return res
            .status(200)
            .json(
                new ApiResponse(200, userDeleted, "user deleted successfully"),
            )
            .clearCookie("accessToken")
            .clearCookie("refreshToken");
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
});

export {
    SignUpUser,
    SignInUser,
    LogOutUser,
    CurrentUser,
    UpdateAccessAndRefreshTokens,
    UpdateUserAvatar,
    UpdateAccountInfo,
    UserActiveDates,
    DeleteUser,
};
