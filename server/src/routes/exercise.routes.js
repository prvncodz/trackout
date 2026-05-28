import express from "express"
import { AddExerciseToLog, DeleteExerciseFromLog, UpdateExercise } from "../controllers/exercise.controller.js"

const router = express.Router()

router.post("/create/:logId", AddExerciseToLog)
router.patch("/update/:exerciseId", UpdateExercise)
router.delete("/delete/:logId/:exerciseId", DeleteExerciseFromLog)

export default router
