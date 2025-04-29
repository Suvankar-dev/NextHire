import express from "express";
const userRouter = express.Router();
import {
  login,
  signup,
  logout,
  updateProfilePic,
  checkAuth,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

userRouter.post("/login", login);
userRouter.post("/register", signup);
userRouter.get("/logout", logout);
userRouter.get("/check-auth", protectRoute, checkAuth);
userRouter.put("/update-pic", updateProfilePic);

export default userRouter;
