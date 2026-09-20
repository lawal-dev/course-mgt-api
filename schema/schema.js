import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),

  role: z.enum(["INSTRUCTOR", "STUDENT"]).default("STUDENT"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .optional(),

  email: z.string().email("Invalid email address").optional(),
});

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  price: z.number().min(0, "Price cannot be negative"),

  published: z.boolean().optional(),
});

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const courseIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
