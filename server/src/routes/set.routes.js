import express from "express"
import { DeleteSet, GetAllSetsOfExercise } from "../controllers/set.controller"

const router = express.Router()

router.get("/all-sets/:exerciseId", GetAllSetsOfExercise)
router.delete("/delete-set/:setId", DeleteSet)

export default router
