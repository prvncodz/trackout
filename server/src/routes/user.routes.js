import { SignInUser, SignUpUser, LogOutUser, CurrentUser, UpdateAccessAndRefreshTokens, UpdateUserAvatar, UpdateAccountInfo, UserProfile } from "../controllers/user.controllers.js";
import express from "express"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.post("/refresh-tokens", UpdateAccessAndRefreshTokens)
router.get("/current-user", auth, CurrentUser);
router.post("/logout", auth, LogOutUser);
router.post("/update-user-avatar", auth, UpdateUserAvatar);
router.post("/update-user-info", auth, UpdateAccountInfo);
router.get("/get-user-profile", auth, UserProfile);

export default router;
