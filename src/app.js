import express from "express";
import authRoutes from "../modules/auth/auth.route.js";
import userRoutes from "../modules/users/user.route.js";
import courseRoutes from "../modules/courses/course,.route.js";
import enrollmenoutes from "../modules/enrollments/enrollment.route.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmenoutes);
app.use(errorHandler);

export default app;
