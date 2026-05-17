import express from "express"
import { CreateLog, GetAllLogs, GetLogWithId, MarkLogCompleted } from "../controllers/log.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router()


//protected routes
router.post("/create", auth, CreateLog)
router.get("/all-logs/:userId", auth, GetAllLogs)
router.patch("/mark-completed/:logId", auth, MarkLogCompleted)
router.get("/log/:logId", auth, GetLogWithId)

export default router
