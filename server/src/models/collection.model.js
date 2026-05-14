import { Schema } from "mongoose";


const CollectionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    logs: [{
        type: Schema.Types.ObjecId,
        ref: "Log",
        required: true
    }],
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Collection = mongoose.model('Collection', CollectionSchema);
export default Collection;
