export const roles = {
  ADMIN: [
    "users:read",
    "users:delete",
    "users:update",
    "courses:read",
    "courses:delete",
  ],

  INSTRUCTOR: [
    "courses:create",
    "courses:read",
    "courses:update",
    "courses:delete",
    "courses:students:read",
  ],

  STUDENT: [
    "courses:read",
    "enrollments:create",
    "enrollments:delete",
    "enrollments:read",
  ],
};
