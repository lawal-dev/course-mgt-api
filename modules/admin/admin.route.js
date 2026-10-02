import express from "express";
import { statDashboardController } from "./admin.controller.js";
import { requirePermission } from "../../middlewares/requirePermission.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = express.Router();

router.get(
  "/stat",
  authenticate,
  requirePermission("stat:read"),
  statDashboardController,
);

export default router;
