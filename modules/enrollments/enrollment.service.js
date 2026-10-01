import { AppError } from "../../utils/AppError.js";
import prisma from "../../utils/db.js";
import { findCourseById } from "../courses/course.service.js";

export const enroll = async (courseId, userId) => {
  try {
    const cousrseExisting = await findCourseById(courseId);
    if (!cousrseExisting) {
      throw new AppError("No Course Found", 404);
    }

    if (!cousrseExisting.published) {
      throw new AppError("This course is not available for enrollment", 403);
    }
    const enrollment = await prisma.enroll.create({
      data: {
        courseId,
        studentId: userId,
      },
    });
    return enrollment;
  } catch (error) {
    if (error.code === "P2002") {
      throw new AppError("You are already enrolled in this course", 409);
    }
    throw error;
  }
};

export const unenroll = async (courseId, userId) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: userId,
        courseId,
      },
    },
  });

  if (!enrollment) {
    throw new AppError("You are not enrolled in this course", 404);
  }

  await prisma.enrollment.delete({
    where: {
      id: enrollment.id,
    },
  });

  return enrollment;
};

export const getMyEnrollments = async (studentId) => {
  return await prisma.enrollment.findMany({
    where: {
      studentId,
    },
    include: {
      course: true,
    },
  });
};

export const getCourseStudents = async (courseId, instructorId) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  if (course.instructorId !== instructorId) {
    throw new AppError("You can only view students in your own courses", 403);
  }

  return await prisma.enrollment.findMany({
    where: {
      courseId,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

export const getEnrollments = async () => {
  try {
    return await prisma.enrollment.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            published: true,
          },
        },
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getEnrollment = async (id) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        id,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            published: true,
          },
        },
      },
    });
    return enrollment;
  } catch (error) {
    throw error;
  }
};

export const deleteEnrollment = async (id) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        id,
      },
    });

    if (!enrollment) {
      throw new AppError("Enrollment not found", 404);
    }

    await prisma.enrollment.delete({
      where: {
        id: enrollment.id,
      },
    });

    return enrollment;
  } catch (error) {
    throw error;
  }
};
