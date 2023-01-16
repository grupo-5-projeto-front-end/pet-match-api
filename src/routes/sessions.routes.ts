import { Router } from "express";
import { loginController } from "../controllers";
import { verifyRequestPerSchema } from "../middleware";
import { loginSchema } from "../schemas";

export const sessionsRoutes = Router();
sessionsRoutes.post(
  "/login",
  verifyRequestPerSchema(loginSchema),
  loginController
);
