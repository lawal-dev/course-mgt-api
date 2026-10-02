import express from "express";
import {
  createCourseController,
  deleteCourseController,
  getAllCoursesController,
  getCourseController,
  updateCourseController,
} from "./course.controller.js";

import {
  courseIdSchema,
  createCourseSchema,
  paginationSchema,
  updateCourseSchema,
} from "../../schema/schema.js";
import { validate } from "../../middlewares/validate.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { requirePermission } from "../../middlewares/requirePermission.js";
const router = express.Router();

router.get(
  "/",
  authenticate,
  requirePermission("courses:read"),
  validate(paginationSchema, "query"),
  getAllCoursesController,
);
router.get(
  "/:id",
  authenticate,
  validate(courseIdSchema, "params"),
  requirePermission("courses:read"),
  getCourseController,
);
router.post(
  "/",
  authenticate,
  validate(createCourseSchema, "body"),
  requirePermission("courses:create"),
  createCourseController,
);
router.patch(
  "/:id",
  authenticate,
  validate(courseIdSchema, "params"),
  validate(updateCourseSchema, "body"),
  requirePermission("courses:update"),
  updateCourseController,
);
router.delete(
  "/:id",
  authenticate,
  validate(courseIdSchema, "params"),
  requirePermission("courses:delete"),
  deleteCourseController,
);

export default router;
