import mongoose, { Schema } from "mongoose"

const ExerciseSchema = new Schema({
    logId: {
        type: Schema.Types.ObjectId,
        ref: "Log"
    },
    name: {
        type: String,
        required: true
    },
    sets: [{
        type: Schema.Types.ObjectId,
        ref: "Set"
    }]
}, { timestamps: true })

const Exercise = mongoose.model('Exercise',ExerciseSchema);
export default Exercise
