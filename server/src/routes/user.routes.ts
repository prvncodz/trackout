import {
    SignInUser,
    SignUpUser,
    LogOutUser,
    CurrentUser,
    UpdateAccessAndRefreshTokens,
    UpdateUserAvatar,
    UpdateAccountInfo,
    DeleteUser,
    UserActiveDates,
    RedirectToGoogle,
    GoogleCallback,
} from "../controllers/user.controllers";
import { Router } from "express";
import auth from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router: Router = Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.get("/refresh-tokens", UpdateAccessAndRefreshTokens);

//secured routes
router.get("/current-user", auth, CurrentUser);
router.post("/logout", auth, LogOutUser);
router.put("/update-avatar", auth, upload.single("avatar"), UpdateUserAvatar);
router.patch("/update-info", auth, UpdateAccountInfo);
router.get("/active-dates", auth, UserActiveDates);
router.delete("/delete-user", auth, DeleteUser);
router.get("/google", RedirectToGoogle);
router.get("/google/callback", GoogleCallback);

export default router;
