import { Router } from "express";
import {
  createUserController,
  listUsersController,
  patchUserController,
} from "../controllers";
import {
  verifyAuth,
  verifyRequestPerSchema,
  verifyUserIdParameter,
} from "../middleware";
import { userRequestSchema, userUpdateRequestSchema } from "../schemas";

export const usersRoutes = Router();

usersRoutes.post(
  "/users",
  verifyRequestPerSchema(userRequestSchema),
  createUserController
);

usersRoutes.get("/users", listUsersController);

usersRoutes.patch(
  "/users/:id",
  verifyUserIdParameter,
  verifyAuth,
  verifyRequestPerSchema(userUpdateRequestSchema),
  patchUserController
);
