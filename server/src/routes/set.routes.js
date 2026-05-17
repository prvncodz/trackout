import express from "express"
import { CreateSet, DeleteSet, GetAllSetsOfExercise, ToggleSetAsCompleted, UpdateSet } from "../controllers/set.controller.js"

const router = express.Router()

router.post("/create-set/:exerciseId", CreateSet)
router.get("/all-sets/:exerciseId", GetAllSetsOfExercise)
router.delete("/delete-set/:setId", DeleteSet)
router.patch("/update-set/:setId", UpdateSet)
router.patch("/toggle-set-completed/:setId", ToggleSetAsCompleted)

export default router
