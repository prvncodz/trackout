import express from "express"
import { CreateSet, DeleteSet, GetAllSetsOfExercise, UpdateSet } from "../controllers/set.controller"

const router = express.Router()

router.post("/create-set/:exerciseId", CreateSet)
router.get("/all-sets/:exerciseId", GetAllSetsOfExercise)
router.delete("/delete-set/:setId", DeleteSet)
router.patch("/update-set/:setId", UpdateSet)

export default router
