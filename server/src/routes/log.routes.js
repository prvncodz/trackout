import express from "express"
import { CreateLog, GetAllLogs, GetLogWithId } from "../controllers/log.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create", auth, CreateLog)
router.get("/all-logs", auth, GetAllLogs)
router.get("/log/:logId", auth, GetLogWithId)

export default router
