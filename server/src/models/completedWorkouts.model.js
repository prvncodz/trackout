import mongoose, { Schema } from "mongoose";

const CompletedWorkoutsSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "completed workout should have a owner field"],
    },
    name: {
      type: String,
      trim: true,
      minLenght: [3, "the workout name must be at least 3 characters long"],
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

const CompletedWorkouts = mongoose.model(
  "CompletedWorkouts",
  CompletedWorkoutsSchema,
);

export default CompletedWorkouts;
