import { Router } from "express";
import controllers from "../controllers/index.controller";

export const authRouter: Router = Router();

authRouter.post("/register", controllers.authController.register);
authRouter.get("/refresh", controllers.authController.refreshToken);

authRouter.get("/generate-token", controllers.authController.generateTokenHandler);

// authRouter.get("/me", isLogin, controllers.getMe);

export default authRouter;
