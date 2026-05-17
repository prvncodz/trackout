import User from "../models/user.model.js"
import { userSignUpSchema, userSignInSchema } from "../schemas/user.schemas.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { DeleteFromCloud, UploadToCloud } from "../utils/cloudinary.js"



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

    const userExists = await User.findOne({ fullname });
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

    const createdUser = await User.findById(user?._id).select("-password")

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
    const loggedUser = await User.findById(user?._id).select("-password -refreshToken")

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

    const token = req.cookies?.accessToken || req.headers['authorization']?.split(" ")?.[1]
    if (!token) {
        throw new ApiError(400, "invalid refresh token")
    }
    const decodedToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(400, "unauthorized request")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(decodedToken?._id);
    const loggedUser = await User.findById(decodedToken?._id).select("-password -refreshToken")

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
            "tokens updated successfully"))
})


const UpdateUserAvatar = asyncHandler(async (req, res) => {
    const filePath = req.files?.[0]?.path
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
        { new: true },
    ).select("-password -refreshTokens");

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
            new: true,
        },
    ).select("-password -refershToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "information updated successfully"));
});

const UserProfile = asyncHandler(async (req, res) => {

})

export {
    SignUpUser,
    SignInUser,
    LogOutUser,
    CurrentUser,
    UpdateAccessAndRefreshTokens,
    UpdateUserAvatar,
    UpdateAccountInfo,
    UserProfile
}
