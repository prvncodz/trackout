import mongoose, { Schema } from "mongoose";

const SetSchema = new Schema({
    exerciseId: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    setNo: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    completed: Boolean
}, { timestamps: true })

const Set = mongoose.model('Set', SetSchema);
export default Set;
