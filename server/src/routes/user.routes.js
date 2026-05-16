import { SignUpUser } from "../controllers/user.controllers.js";
import express from "express"


const router = express.Router();

router.post("/signin", SignUpUser);

export default router;
