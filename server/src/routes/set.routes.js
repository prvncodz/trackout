import express from "express"
import { CreateSet, DeleteSet, GetAllSetsOfExercise } from "../controllers/set.controller"

const router = express.Router()

router.post("/create-set/:exerciseId", CreateSet)
router.get("/all-sets/:exerciseId", GetAllSetsOfExercise)
router.delete("/delete-set/:setId", DeleteSet)

export default router
