import { Router } from "express";
import { createUserController } from "../controllers";
import { verifyRequestPerSchema } from "../middleware";
import { userRequestSchema } from "../schemas";

export const usersRoutes = Router();

usersRoutes.post("/users", verifyRequestPerSchema(userRequestSchema), createUserController);