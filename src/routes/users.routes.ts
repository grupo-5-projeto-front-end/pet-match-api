import { Router } from "express";
import { createUserController, listUserByIdController, listUsersController } from "../controllers";
import { softDeleteUserController } from "../controllers/users/softDeleteUser.controller";
import { verifyAuth, verifyRequestPerSchema, verifyUserIdParameter } from "../middleware";
import { userRequestSchema } from "../schemas";

export const usersRoutes = Router();

usersRoutes.post("/users", verifyRequestPerSchema(userRequestSchema), createUserController);

usersRoutes.get("/users", listUsersController);
usersRoutes.get("/users/:id", verifyUserIdParameter, listUserByIdController);
usersRoutes.delete("/users", verifyAuth, softDeleteUserController)