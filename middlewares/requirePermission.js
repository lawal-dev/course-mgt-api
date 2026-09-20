import { roles } from "../data/permission.js";
import { AppError } from "../utils/AppError.js";

export const requirePermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = roles[userRole] || [];

    if (!permissions.includes(permission)) {
      return next(new AppError("You do not have permission", 403));
    }
    next();
  };
};
