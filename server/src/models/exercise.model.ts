import mongoose, { Schema, Types } from "mongoose";

interface IExercise extends mongoose.Document {
    logId: Types.ObjectId,
    name: string,
    muscleGroup: string,
    note?: string,
    sets: Types.ObjectId[],
}

const ExerciseSchema = new Schema<IExercise>(
    {
        logId: {
            type: Schema.Types.ObjectId,
            ref: "Log",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Exercise name is required!"],
            trim: true,
            minlength: [3, "Exercise name must be at least 3 characters long!"],
            maxlength: [
                40,
                "Exercise name must be at most 50 characters long!",
            ],
        },
        muscleGroup: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Muscle group must be at least 3 characters long!"],
            maxlength: [40, "Muscle group must be at most 50 characters long!"],
        },
        note: {
            type: String,
            trim: true,
        },
        sets: [
            {
                type: Schema.Types.ObjectId,
                ref: "Set",
            },
        ],
    },
    { timestamps: true },
);

const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);
export default Exercise;
