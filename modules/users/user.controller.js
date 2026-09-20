import { deleteUser, updateUser, user, users } from "./user.service.js";

export const usersController = async (req, res, next) => {
  try {
    const data = await users();
    res.status(200).json({
      success: true,
      message: "Successfully fetched Users",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = async (req, res, next) => {
  try {
    const data = await user(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully fetched User",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const user = await updateUser(req.body, req.params.id);
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
