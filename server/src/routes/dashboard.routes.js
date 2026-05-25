import { DashBoardController } from "../controllers/dashboard.controller.js";
import express from "express"
import auth from "../middlewares/auth.middleware.js"
const router = express.Router()

router.get("/stats", auth, DashBoardController)

export default router
