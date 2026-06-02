import mongoose, { Schema } from "mongoose";

interface ICollection extends mongoose.Document {
    owner: Schema.Types.ObjectId,
    logs: Schema.Types.ObjectId[],
    name: string,
}

const CollectionSchema = new Schema<ICollection>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        logs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Log",
            },
        ],
        name: {
            type: String,
            required: [true, "Collection name is required"],
            trim: true,
        },
    },
    { timestamps: true },
);

const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);
export default Collection;
