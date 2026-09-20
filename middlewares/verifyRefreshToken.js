import { configs } from "../config/config.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const verifyRefreshAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return next(new AppError("Refresh token is required", 401));
    }

    const decoded = jwt.verify(token, configs.refreshKey);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Refresh token has expired", 401));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid refresh token", 401));
    }

    next(error);
  }
};
