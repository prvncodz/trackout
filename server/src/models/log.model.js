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
        required: true
    },
    completedAt: {
        type: Date
    }

}, { timestamps: true })

const Log = mongoose.model('Log', LogSchema)
export default Log
