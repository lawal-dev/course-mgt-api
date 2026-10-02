import {
  enroll,
  getCourseStudents,
  getEnrollment,
  getEnrollments,
  getMyEnrollments,
  deleteEnrollment,
} from "./enrollment.service.js";

export const enrollController = async (req, res, next) => {
  try {
    const result = await enroll(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      message: "Successfully enrolled",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const unenrollController = async (req, res, next) => {
  try {
    await unenrollCourse(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Successfully unenrolled from course",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyEnrollmentsController = async (req, res, next) => {
  try {
    const enrollments = await getMyEnrollments(req.user.id);

    res.status(200).json({
      success: true,
      enrollments,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseStudentsController = async (req, res, next) => {
  try {
    const students = await getCourseStudents(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentsController = async (req, res, next) => {
  try {
    const { page, limit } = req.validatedQuery;
    const enrollments = await getEnrollments(page, limit);
    res.status(200).json({
      success: true,
      data: enrollments.enrollments,
      pagination: enrollments.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentController = async (req, res, next) => {
  try {
    const enrollment = await getEnrollment(req.params.id);
    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEnrollmentController = async (req, res, next) => {
  try {
    await deleteEnrollment(req.params.id);
    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
