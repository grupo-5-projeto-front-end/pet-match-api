import { Router } from "express";
import { createCommentController } from "../controllers";
import { verifyAuth, verifyUserIdParameter } from "../middleware";

export const commentsRoutes = Router();

commentsRoutes.get("/users/:id", verifyUserIdParameter, verifyAuth, createCommentController);