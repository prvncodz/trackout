import mongoose, { Schema } from "mongoose"

const ExerciseSchema = new Schema({
    logId: {
        type: Schema.Types.ObjectId,
        ref: "Log",
        required: true
    },
    name: {
        type: String,
        required: [true, "Exercise name is required!"],
        trim: true,
        minlength: [3, "Exercise name must be at least 3 characters long!"],
        maxlength: [40, "Exercise name must be at most 50 characters long!"]
    },
    muscleGroup: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Exercise name must be at least 3 characters long!"],
        maxlength: [40, "Exercise name must be at most 50 characters long!"]
    },
    sets: [{
        type: Schema.Types.ObjectId,
        ref: "Set"
    }]
}, { timestamps: true })

const Exercise = mongoose.model('Exercise', ExerciseSchema);
export default Exercise
