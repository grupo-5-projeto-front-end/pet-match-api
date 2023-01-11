import { Router } from "express";
import { createUserController, listUsersController } from "../controllers";
import { verifyRequestPerSchema, verifyUserIdParameter } from "../middleware";
import { userRequestSchema } from "../schemas";

export const usersRoutes = Router();

usersRoutes.post("/users", verifyRequestPerSchema(userRequestSchema), createUserController);

usersRoutes.get("/users", listUsersController);