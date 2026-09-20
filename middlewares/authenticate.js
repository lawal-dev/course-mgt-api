import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Authentication required", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token has expired", 401));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }

    next(error);
  }
};
