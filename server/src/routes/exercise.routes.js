import express from "express"
import { AddExerciseToLog, DeleteExerciseFromLog, UpdateExercise } from "../controllers/exercise.controller.js"

const router = express.Router()

router.post("/create/:logId", AddExerciseToLog)
router.patch("/update-exercise/:exerciseId", UpdateExercise)
router.delete("/delete-exercise/:logId/:exerciseId", DeleteExerciseFromLog)

export default router
