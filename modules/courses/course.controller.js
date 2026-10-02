import { user } from "../users/user.service.js";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "./course.service.js";

export const getAllCoursesController = async (req, res, next) => {
  try {
    const { page, limit } = req.validatedQuery;
    const courses = await getCourses(page, limit);
    res.status(200).json({
      success: true,
      message: "Successfully",
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const course = await getCourse(id);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const createCourseController = async (req, res, next) => {
  try {
    const id = req.user.id;
    const course = await createCourse(req.body, +id);
    res.status(201).json({
      success: true,
      message: "Successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourseController = async (req, res, next) => {
  try {
    const course = await updateCourse(req.body, req.params.id, req.user);
    res.status(200).json({
      success: true,
      message: "Course Successfully Updated",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const course = await deleteCourse(id, userId);
    res.status(200).json({
      success: true,
      message: "Course Successfully Deleted",
    });
  } catch (error) {
    next(error);
  }
};
