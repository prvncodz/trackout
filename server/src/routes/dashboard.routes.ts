import { DashBoardController } from "../controllers/dashboard.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.get("/stats", auth, DashBoardController);

export default router;
