import { statDashboard } from "./admin.service.js";

export const statDashboardController = async (req, res, next) => {
  try {
    const stat = await statDashboard();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: stat,
    });
  } catch (error) {
    next(error);
  }
};
