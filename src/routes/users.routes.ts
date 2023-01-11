import { Router } from "express";
import { createUserController, listUserByIdController, listUsersController, softDeleteUserController } from "../controllers";
import { verifyAuth, verifyRequestPerSchema, verifyUserIdParameter } from "../middleware";
import { userRequestSchema } from "../schemas";

export const usersRoutes = Router();

usersRoutes.post("/users", verifyRequestPerSchema(userRequestSchema), createUserController);

usersRoutes.get("/users", listUsersController);
usersRoutes.get("/users/:id", verifyUserIdParameter, listUserByIdController);
usersRoutes.delete("/users", verifyAuth, softDeleteUserController)