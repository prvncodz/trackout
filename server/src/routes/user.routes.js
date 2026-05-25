import { SignInUser, SignUpUser, LogOutUser, CurrentUser, UpdateAccessAndRefreshTokens, UpdateUserAvatar, UpdateAccountInfo, UserProfile, DeleteUser } from "../controllers/user.controllers.js";
import express from "express"
import auth from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.get("/refresh-tokens", UpdateAccessAndRefreshTokens)

//secured routes
router.get("/current-user", auth, CurrentUser);
router.post("/logout", auth, LogOutUser);
router.put("/update-user-avatar",
    auth,
    upload.single("avatar"),
    UpdateUserAvatar);
router.patch("/update-user-info", auth, UpdateAccountInfo);
router.get("/profile", auth, UserProfile);
router.delete("/delete-user", auth, DeleteUser);

export default router;
