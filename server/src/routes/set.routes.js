import express from "express"
import { CreateSet, DeleteSet, ToggleSetAsCompleted, UpdateSet } from "../controllers/set.controller.js"

const router = express.Router()

router.post("/create/:exerciseId", CreateSet)
router.delete("/delete-set/:setId/:exerciseId", DeleteSet)
router.patch("/update-set/:setId", UpdateSet)
router.patch("/toggle-set-completed/:setId", ToggleSetAsCompleted)

export default router
