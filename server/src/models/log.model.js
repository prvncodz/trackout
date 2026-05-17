import mongoose, { Schema } from "mongoose"


const LogSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    logName: {
        type: String,
        required: [true, "Log name is required!"],
        trim: true,
        minlength: [3, "Log name must be at least 3 characters long!"],
        maxlength: [50, "Log name must be at most 50 characters long!"]
    },
    completedAt: {
        type: Date
    }

}, { timestamps: true })

const Log = mongoose.model('Log', LogSchema)
export default Log
