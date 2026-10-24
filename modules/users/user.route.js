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
 *     description: Retrieve a paginated list of users.
 *     tags:
 *       - Users
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email
 *
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum:
 *             - ADMIN
 *             - INSTRUCTOR
 *             - STUDENT
 *         description: Filter users by role
 *
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *
 *       401:
 *         description: Authentication required
 *
 *       403:
 *         description: Insufficient permissions
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
