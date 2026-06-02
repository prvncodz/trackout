import { Router } from "express";
import {
    CreateSet,
    DeleteSet,
    ToggleSetAsCompleted,
    UpdateSet,
} from "../controllers/set.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/create/:exerciseId", auth, CreateSet);
router.delete("/delete/:setId/:exerciseId", auth, DeleteSet);
router.patch("/update/:setId", auth, UpdateSet);
router.patch("/toggle-set-completed/:setId", auth, ToggleSetAsCompleted);

export default router;
