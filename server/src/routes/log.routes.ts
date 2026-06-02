import express from "express";
import {
    CreateLog,
    DeleteLog,
    DuplicateLog,
    GetAllLogs,
    GetLogWithId,
    MarkLogCompleted,
    UpdateLog,
} from "../controllers/log.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

//protected routes
router.post("/create", auth, CreateLog);
router.get("/all-logs", auth, GetAllLogs);
router.patch("/mark-completed/:logId", auth, MarkLogCompleted);
router.get("/:logId", auth, GetLogWithId);
router.patch("/update/:logId", UpdateLog);
router.delete("/delete/:logId", auth, DeleteLog);
router.post("/duplicate/:logId", auth, DuplicateLog);

export default router;
