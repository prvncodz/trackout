import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

const auth = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.accessToken || req?.headers['authorization']?.split(" ")?.[1]
    if (!token) {
        throw new ApiError(400, "invalid token")
    }
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(401, "unauthorized request")
    }
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "user not found")
    }
    req.user = user
    next();
})

export default auth;
