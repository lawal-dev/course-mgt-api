import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  deleteEnrollmentController,
  enrollController,
  getCourseStudentsController,
  getEnrollmentController,
  getEnrollmentsController,
  getMyEnrollmentsController,
  unenrollController,
} from "./enrollment.controller.js";
import { courseIdSchema } from "../../schema/schema.js";
import { requirePermission } from "../../middlewares/requirePermission.js";
const router = express.Router();

router.post(
  "/courses/:id/enroll",
  authenticate,
  requirePermission("enrollments:create"),
  validate(courseIdSchema, "params"),
  enrollController,
);

router.delete(
  "/courses/:id/enroll",
  authenticate,
  requirePermission("enrollments:delete"),
  validate(courseIdSchema, "params"),
  unenrollController,
);

router.get(
  "/enrollment/me",
  authenticate,
  requirePermission("enrollments:read"),
  getMyEnrollmentsController,
);

router.get(
  "/courses/:id/students",
  authenticate,
  requirePermission("courses:students:read"),
  validate(courseIdSchema, "params"),
  getCourseStudentsController,
);

router.get(
  "/enrollments",
  authenticate,
  requirePermission("users-enrollments:read"),
  getEnrollmentsController,
);

router.get(
  "/enrollments/:id",
  authenticate,
  requirePermission("users-enrollments:read"),
  validate(courseIdSchema, "params"),
  getEnrollmentController,
);

router.delete(
  "/enrollments/:id",
  authenticate,
  requirePermission("users-enrollments:delete"),
  validate(courseIdSchema, "params"),
  deleteEnrollmentController,
);

export default router;
