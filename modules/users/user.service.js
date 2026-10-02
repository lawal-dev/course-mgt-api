import { getPagination, getPaginationMeta } from "../../utils/pagination.js";
import { AppError } from "../../utils/AppError.js";
import prisma from "../../utils/db.js";

export const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const users = async (page, limit, role) => {
  try {
    const { skip, take } = getPagination(page, limit);
    const where = role ? { role } : {};

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        skip,
        take,
        where,
        omit: {
          password: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);
    const pagination = getPaginationMeta(page, limit, total);
    return { users, pagination };
  } catch (error) {
    throw error;
  }
};

export const user = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      throw new AppError("No User found", 404);
    }
    return user;
  } catch (error) {
    if (error.code == "P2025") {
      throw new AppError("No user found", 404);
    }

    throw error;
  }
};

export const updateUser = async (data, id) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data,
      omit: {
        password: true,
      },
    });

    return updatedUser;
  } catch (error) {
    if (error.code === "P2002") {
      throw new AppError("Email already exist", 400);
    }
    if (error.code === "P2025") {
      throw new AppError("No user found", 404);
    }

    throw error;
  }
};

export const updateUserRole = async (data, id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: data.role,
      },
      omit: {
        password: true,
      },
    });

    return updatedUser;
  } catch (error) {
    if (error.code === "P2025") {
      throw new AppError("No user found", 404);
    }

    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new AppError("No user found", 404);
    }

    throw error;
  }
};
