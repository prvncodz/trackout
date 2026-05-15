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
        unique: true,
        minLength: [1, "Set number must be at least 1!"],
        maxLength: [20, "Set number must be at most 20!"]
    },
    weight: {
        type: Number,
        required: true,
        minLength: [1, "Weight must be of at least 1 digit!"],
    },
    reps: {
        type: Number,
        required: true,
        minLength: [1, "Reps must be of at least 1 digit!"],
    },
    completed: Boolean
}, { timestamps: true })

const Set = mongoose.model('Set', SetSchema);
export default Set;
