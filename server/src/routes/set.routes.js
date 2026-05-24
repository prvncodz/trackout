import express from "express"
import { CreateSet, DeleteSet, ToggleSetAsCompleted, UpdateSet } from "../controllers/set.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create/:exerciseId",auth, CreateSet)
router.delete("/delete-set/:setId/:exerciseId",auth, DeleteSet)
router.patch("/update-set/:setId",auth, UpdateSet)
router.patch("/toggle-set-completed/:setId",auth, ToggleSetAsCompleted)

export default router
