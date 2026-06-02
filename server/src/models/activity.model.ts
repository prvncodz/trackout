import { Schema } from "mongoose";
import mongoose from "mongoose";

interface IActivity extends mongoose.Document {
    owner: Schema.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
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
