import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user.model";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";


export type JwtPayloadWithId = JwtPayload & { _id: Types.ObjectId };

const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.cookies?.accessToken;
        if (!token) {
            throw new ApiError(401, "invalid token");
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
            throw new ApiError(404, "user has been deleted");
        }

        req.user = user;
        next();
    } catch (err: unknown) {
        console.error("GLOBAL ERROR:", err)
        if (err instanceof ApiError) {
            throw err
        } else if (err instanceof JsonWebTokenError) {
            throw new ApiError(401, "unauthorized request");
        } else if (err instanceof TokenExpiredError) {
            throw new ApiError(401, "token expired");
        } else {
            throw new ApiError(500, "something went wrong");
        }
    }
});

export default auth;
