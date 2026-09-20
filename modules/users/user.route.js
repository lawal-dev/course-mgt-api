import express from "express";
import { updateUserSchema, userIdSchema } from "../../schema/schema.js";
import {
  deleteUserController,
  updateUserController,
  userController,
  usersController,
} from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import { requirePermission } from "../../middlewares/requirePermission.js";
import { authenticate } from "../../middlewares/authenticate.js";
const router = express.Router();

router.get("/", authenticate, requirePermission("users:read"), usersController);
router.get(
  "/:id",
  authenticate,
  requirePermission("user:read"),
  validate(userIdSchema, "params"),
  userController,
);
router.patch(
  "/:id",
  authenticate,
  validate(userIdSchema, "params"),
  requirePermission("user:update"),
  validate(updateUserSchema, "body"),
  updateUserController,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("users:delete"),
  validate(userIdSchema, "params"),
  validate(userIdSchema, "params"),
  deleteUserController,
);

export default router;
