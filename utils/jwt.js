import jwt from "jsonwebtoken";
import { configs } from "../config/config.js";

export const generateAccessToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    configs.secretKey,
    { expiresIn: "1h" },
  );
  return token;
};

export const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    configs.refreshKey,
    {
      expiresIn: "7d",
    },
  );
  return token;
};
