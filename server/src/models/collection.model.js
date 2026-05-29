import { Schema } from "mongoose";

const CollectionSchema = new Schema(
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

const Collection = mongoose.model("Collection", CollectionSchema);
export default Collection;
