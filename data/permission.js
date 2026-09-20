export const roles = {
  admin: ["users:read", "users:delete", "courses:read", "courses:delete"],

  instructor: [
    "courses:create",
    "courses:read",
    "courses:update",
    "courses:delete",
    "courses:students:read",
  ],

  student: [
    "courses:read",
    "enrollments:create",
    "enrollments:delete",
    "enrollments:read",
  ],
};
