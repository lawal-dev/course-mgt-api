import { success } from "zod";
import { me, register } from "./auth.service.js";

export const registerController = async (req, res, next) => {
  try {
    const result = await register(req.body);
    res.status(201).json({
      success: true,
      message: "Account created sucessfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.cookie("refreshToken", login.refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "Sucessfully Login",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: false,
      secure: false,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    next(error);
  }
};

export const meController = async (req, res, next) => {
  try {
    const user = await me(req.user.id);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
