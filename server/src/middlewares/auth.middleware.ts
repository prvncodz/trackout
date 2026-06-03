import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User, { IUser } from "../models/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";


export type JwtPayloadWithId = JwtPayload & { _id: Types.ObjectId };

const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.cookies?.accessToken;
    if (!token) {
        throw new ApiError(400, "invalid token");
    }
    const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as any,
    );

    if (!decodedToken) {
        throw new ApiError(401, "unauthorized request");
    }
    const user = await User.findById((decodedToken as JwtPayloadWithId)?._id)
        .lean()
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "user not found");
    }

    req.user = user;
    next();
});

export default auth;
