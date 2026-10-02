import { getPagination, getPaginationMeta } from "../../utils/pagination.js";
import { AppError } from "../../utils/AppError.js";
import prisma from "../../utils/db.js";

export const getCourses = async (page, limit, search, published) => {
  const { skip, take } = getPagination(page, limit);
  const where = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (published) {
    where.published = published === "true";
  }

  const [total, courses] = await Promise.all([
    prisma.course.count({ where }),
    prisma.course.findMany({
      skip,
      where,
      take,
    }),
  ]);

  const pagination = getPaginationMeta(page, limit, total);
  return { total, courses, pagination };
};

export const getCourse = async (id) => {
  if (!id) {
    throw new AppError("Course ID is required", 400);
  }
  const checkCourse = await findCourseById(id);
  if (!checkCourse) {
    throw new AppError("No Course Found", 404);
  }

  return checkCourse;
};

export const createCourse = async (data, id) => {
  try {
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        published: data.published ?? false,
        instructorId: id,
      },
      omit: {
        instructorId: true,
      },
    });
    return course;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (data, id, user) => {
  try {
    const checkCourse = await findCourseById(id);
    if (!checkCourse) {
      throw new AppError("No Course Found", 404);
    }
    const course = await prisma.course.update({
      where: {
        id,
      },
      data,
    });

    if (user.role === "INSTRUCTOR" && course.instructorId !== user.id) {
      throw new AppError("You can only update your own courses", 403);
    }

    return course;
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (id, userId) => {
  try {
    const checkCourse = await findCourseById(id);
    if (!checkCourse) {
      throw new AppError("No Course Found", 404);
    }

    if (
      checkCourse.role === "INSTRUCTOR" &&
      checkCourse.instructorId !== userId
    ) {
      throw new AppError("You can only update your own courses", 403);
    }

    const course = await prisma.course.delete({
      where: {
        id,
      },
    });
    return course;
  } catch (error) {
    if (error.code == "P2025") {
      throw new AppError("No course found", 404);
    }
    throw error;
  }
};

export const findCourseById = async (id) => {
  return await prisma.course.findUnique({
    where: {
      id,
    },
  });
};
