import express from "express"
import { AddExerciseToLog, GetAllExercises } from "../controllers/exercise.controller"

const router = express.Router()

router.post("/create", AddExerciseToLog)
router.get("/all-exercises/:logId", GetAllExercises)


export default router
