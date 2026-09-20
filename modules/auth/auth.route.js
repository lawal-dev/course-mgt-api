import express from "express";
import {
  loginController,
  logoutController,
  meController,
  registerController,
} from "./auth.controller.js";
import { registerSchema } from "../../schema/schema.js";
import { validate } from "../../middlewares/validate.js";
const router = express.Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", loginController);
router.post("logout", logoutController);
router.get("me", meController);

export default router;
