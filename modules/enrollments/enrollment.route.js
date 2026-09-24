import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { enrollController, getCourseStudentsController, getMyEnrollmentsController, unenrollController } from "./enrollment.controller.js";
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
  "/:id/enroll",
  authenticate,
  requirePermission("enrollments:delete"),
  validate(courseIdSchema, "params"),
  unenrollController
);


router.get(
  "/enrollment/me",
  authenticate,
  requirePermission("enrollments:read"),
  getMyEnrollmentsController
);

router.get(
  "/:id/students",
  authenticate,
  requirePermission("courses:students:read"),
  validate(courseIdSchema, "params"),
  getCourseStudentsController
)
export default router;
