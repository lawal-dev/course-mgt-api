import dotenv from "dotenv";
dotenv.config();

export const configs = {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  refreshKey: process.env.JWT_REFRESH_KEY,
};
