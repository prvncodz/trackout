import { Schema, Types } from "mongoose";
import mongoose from "mongoose";

interface IActivity extends mongoose.Document {
    owner: Types.ObjectId,
}

const ActivitySchema = new Schema<IActivity>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "owner is required"],
        },
    },
    { timestamps: true },
);

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
export default Activity;
