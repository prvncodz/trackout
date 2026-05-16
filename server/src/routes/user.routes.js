import { SignInUser, SignUpUser, LogOutUser } from "../controllers/user.controllers.js";
import express from "express"


const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.post("/logout", LogOutUser);

export default router;
