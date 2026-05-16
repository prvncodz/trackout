import User from "../models/user.model.js"
import { userSignUpSchema } from "../schemas/user.schemas.js"
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
    const result = userSignUpSchema.safeParse({ fullname, email, height, weight, password });
    if (!result.success) {
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

export {
    SignUpUser,
}
