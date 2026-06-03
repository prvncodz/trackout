import mongoose, { Schema, Types } from "mongoose";

interface ICompletedWorkouts extends mongoose.Document {
    owner: Types.ObjectId;
    name: string;
    muscleGroup: string;
    exercises: Types.ObjectId[];
    noOfSets: number;
    createdAt: Date;
    updatedAt: Date;
}

const CompletedWorkoutsSchema = new Schema<ICompletedWorkouts>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "completed workout should have a owner field"],
        },
        name: {
            type: String,
            trim: true,
            minLenght: [
                3,
                "the workout name must be at least 3 characters long",
            ],
            maxLength: [50, "the workout name cannot exceed 40 characters"],
            required: true,
        },
        muscleGroup: {
            type: String,
        },
        exercises: [
            {
                type: Schema.Types.ObjectId,
                ref: "Exercise",
            },
        ],
        noOfSets: {
            type: Number,
            required: true,
            min: [1, "minimum 1 set is required to mark log as completed"],
        },
    },
    { timestamps: true },
);

const CompletedWorkouts = mongoose.model<ICompletedWorkouts>(
    "CompletedWorkouts",
    CompletedWorkoutsSchema,
);

export default CompletedWorkouts;
