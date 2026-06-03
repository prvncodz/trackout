import { Types } from "mongoose";
import { IUser } from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: (IUser & { _id: Types.ObjectId, __v: number }) | null;
        }
    }
}
