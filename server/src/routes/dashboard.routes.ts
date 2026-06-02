import { DashBoardController } from "../controllers/dashboard.controller";
import { Router } from "express";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/stats", auth, DashBoardController);

export default router;
