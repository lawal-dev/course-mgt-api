import express from "express";
import {
  updateUserRoleSchema,
  updateUserSchema,
  userIdSchema,
  userQuerySchema,
} from "../../schema/schema.js";
import {
  deleteUserController,
  updateUserController,
  updateUserRoleController,
  userController,
  usersController,
} from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import { requirePermission } from "../../middlewares/requirePermission.js";
import { authenticate } from "../../middlewares/authenticate.js";
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get(
  "/",
  authenticate,
  requirePermission("users:read"),
  validate(userQuerySchema, "query"),
  usersController,
);
router.get(
  "/:id",
  authenticate,
  requirePermission("users:read"),
  validate(userIdSchema, "params"),
  userController,
);
router.patch(
  "/:id",
  authenticate,
  validate(userIdSchema, "params"),
  requirePermission("users:update"),
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

router.patch(
  "/:id/role",
  authenticate,
  requirePermission("users:update"),
  validate(userIdSchema, "params"),
  validate(updateUserRoleSchema, "body"),
  updateUserRoleController,
);

export default router;
