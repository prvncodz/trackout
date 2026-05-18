import express from "express"
import { CreateLog, DeleteLog, DuplicateLog, GetAllLogs, GetLogWithId, MarkLogCompleted, UpdateLog } from "../controllers/log.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router()


//protected routes
router.post("/create", auth, CreateLog)
router.get("/all-logs/:userId", auth, GetAllLogs)
router.patch("/mark-completed/:logId", auth, MarkLogCompleted)
router.get("/:logId", auth, GetLogWithId)
router.patch("/update-log/:logId", UpdateLog)
router.delete("/delete-log/:logId", auth, DeleteLog)
router.post("/duplicate-log/:logId", auth, DuplicateLog)

export default router
