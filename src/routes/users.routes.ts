import { Router } from "express";
import {
  createUserController,
  listUserByIdController,
  listUsersController,
  softDeleteUserController,
  patchUserController,
} from "../controllers";
import { userRequestSchema, userUpdateRequestSchema } from "../schemas";
import {
  verifyAuth,
  verifyRequestPerSchema,
  verifyUserIdParameter,
} from "../middleware";

export const usersRoutes = Router();
usersRoutes.post(
  "/users",
  verifyRequestPerSchema(userRequestSchema),
  createUserController
);
usersRoutes.get("/users", listUsersController);
usersRoutes.get("/users/:id", verifyUserIdParameter, listUserByIdController);
usersRoutes.patch(
  "/users/:id",
  verifyUserIdParameter,
  verifyAuth,
  verifyRequestPerSchema(userUpdateRequestSchema),
  patchUserController
);
usersRoutes.delete("/users", verifyAuth, softDeleteUserController);
