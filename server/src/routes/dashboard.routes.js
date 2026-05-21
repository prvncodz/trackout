import { DashBoardController } from "../controllers/dashboard.controller.js";
import express from "express"

const router = express.Router()

router.get("/stats", DashBoardController)

export default router
