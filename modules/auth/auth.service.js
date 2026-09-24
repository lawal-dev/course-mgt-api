import { AppError } from "../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from "../users/user.service.js";
import bcrypt from "bcrypt";

export const register = async (result) => {
  const { name, email, role, password } = result;
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new AppError("Email already exist", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return { name, email, role };
};

export const login = async (data) => {
  const { email, password } = data;
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid Email or Password", 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken: token,
    refreshToken: refreshToken,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
  };
};

export const me = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError("No user found", 404);
  }

  return user;
};

export const updateMe = async (data, id) => {
  const updatedUser = updateUser(data, id);
  return updatedUser;
};
