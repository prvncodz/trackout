import { Schema } from "mongoose";
import mongoose from "mongoose";

const ActivitySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "owner is required"],
        },
    },
    { timestamps: true },
);

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
