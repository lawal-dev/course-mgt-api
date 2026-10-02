import prisma from "../../utils/db.js";

export const statDashboard = async () => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCourses = await prisma.course.count();
    const totalEnrollments = await prisma.enrollment.count();
    return { totalUsers, totalCourses, totalEnrollments };
  } catch (error) {
    throw error;
  }
};

// export const getDashboardStats = async () => {
//   const [
//     totalUsers,
//     totalStudents,
//     totalInstructors,
//     totalAdmins,
//     totalCourses,
//     publishedCourses,
//     unpublishedCourses,
//     totalEnrollments,
//   ] = await Promise.all([
//     prisma.user.count(),

//     prisma.user.count({
//       where: {
//         role: "STUDENT",
//       },
//     }),

//     prisma.user.count({
//       where: {
//         role: "INSTRUCTOR",
//       },
//     }),

//     prisma.user.count({
//       where: {
//         role: "ADMIN",
//       },
//     }),

//     prisma.course.count(),

//     prisma.course.count({
//       where: {
//         published: true,
//       },
//     }),

//     prisma.course.count({
//       where: {
//         published: false,
//       },
//     }),

//     prisma.enrollment.count(),
//   ]);

//   return {
//     totalUsers,
//     totalStudents,
//     totalInstructors,
//     totalAdmins,
//     totalCourses,
//     publishedCourses,
//     unpublishedCourses,
//     totalEnrollments,
//   };
// };
