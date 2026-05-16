import { SignInUser, SignUpUser } from "../controllers/user.controllers.js";
import express from "express"


const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);

export default router;
