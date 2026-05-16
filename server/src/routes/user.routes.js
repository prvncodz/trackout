import { SignInUser, SignUpUser, LogOutUser } from "../controllers/user.controllers.js";
import express from "express"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.post("/logout", auth, LogOutUser);

export default router;
