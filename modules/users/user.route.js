import express from "express";
import { updateUserSchema, userIdSchema } from "../../schema/schema";
import { deleteUserController, updateUserController, userController, usersController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
const router = express.Router();

router.get("/", usersController);
router.get("/:id", validate(userIdSchema, "params"), userController);
router.patch("/", validate(updateUserSchema, "body"), updateUserController);
router.delete("/", validate(userIdSchema, "params"), deleteUserController);

export default router;
