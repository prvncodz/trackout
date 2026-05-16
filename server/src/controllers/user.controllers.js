import User from "../models/user.model.js"
import { userSignUpSchema, userSignInSchema } from "../schemas/user.schemas.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

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

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken
    user.save()

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
        .json(new ApiResponse(200, null,"user logged out successfully"))
})

export {
    SignUpUser,
    SignInUser,
    LogOutUser,
}
