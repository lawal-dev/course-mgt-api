import { success } from "zod";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { login, me, register, updateMe } from "./auth.service.js";

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
    res.cookie("refreshToken", result.refreshToken, {
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

export const refreshTokenController = (req, res, next) => {
  try {
    const newAccessToken = generateAccessToken(req.user);
    const newRefreshToken = generateRefreshToken(req.user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMeController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await updateMe(req.body, userId);
    res.status(200).json({
      success: true,
      message: "Succesfully updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
