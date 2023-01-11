import { Router } from "express"
import { createCommentController } from "../controllers";
import { verifyAuth, verifyRequestPerSchema, verifyUserIdParameter } from "../middleware";
import { commentRequestSchema } from "../schemas";

export const commentsRoutes = Router();

commentsRoutes.post("/comments/:id", verifyUserIdParameter, verifyAuth, verifyRequestPerSchema(commentRequestSchema), createCommentController);