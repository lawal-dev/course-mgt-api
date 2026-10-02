import express from "express";
import authRoutes from "../modules/auth/auth.route.js";
import userRoutes from "../modules/users/user.route.js";
import courseRoutes from "../modules/courses/course.route.js";
import enrollments from "../modules/enrollments/enrollment.route.js";
import adminRoutes from "../modules/admin/admin.route.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/", enrollments);
app.use("/admin", adminRoutes);
app.use(errorHandler);

export default app;
