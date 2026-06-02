import mongoose, { Schema } from "mongoose";

interface ISet extends mongoose.Document {
    owner: Schema.Types.ObjectId,
    exerciseId: Schema.Types.ObjectId,
    setNo: number,
    weight: number,
    reps: number,
    rest?: string,
    isPr?: boolean,
    completed?: boolean,
    createdAt: Date;
    updatedAt: Date;
}

const SetSchema = new Schema<ISet>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        exerciseId: {
            type: Schema.Types.ObjectId,
            ref: "Exercise",
            required: true,
        },
        setNo: {
            type: Number,
            required: true,
            min: [1, "Set number must be at least 1!"],
            max: [20, "Set number must be at most 20!"],
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
        rest: {
            type: String,
            default: "00:30",
        },
        isPr: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const Set = mongoose.model<ISet>("Set", SetSchema);
export default Set;
