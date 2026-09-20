import express from "express";
import {
  loginController,
  logoutController,
  meController,
  refreshTokenController,
  registerController,
} from "./auth.controller.js";
import { loginSchema, registerSchema } from "../../schema/schema.js";
import { validate } from "../../middlewares/validate.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { verifyRefreshAuthenticate } from "../../middlewares/verifyRefreshToken.js";
const router = express.Router();

router.post("/register", validate(registerSchema, "body"), registerController);
router.post("/login", validate(loginSchema, "body"), loginController);
router.post("logout", logoutController);
router.get("/me", authenticate, meController);
router.post("/refresh", verifyRefreshAuthenticate, refreshTokenController);

export default router;
