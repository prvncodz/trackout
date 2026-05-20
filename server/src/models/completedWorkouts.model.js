import mongoose, { Schema } from "mongoose";


const CompletedWorkoutsSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        trim: true,
        minLenght: [3, "the workout name must be at least 3 characters long"],
        maxLength: [50, "the workout name cannot exceed 40 characters"],
        required: true
    },
    muscleGroup: {
        type: String,
        required: true
    },
    isPr: {
        type: Boolean,
        default: false
    },
    noOfSets: {
        type: Number,
        required: true,
        min: [1, "minimum 1 set is required to mark log as completed"],
    },
}, { timestamps: true })
