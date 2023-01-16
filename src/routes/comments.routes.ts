import { Router } from "express";
import {
  createCommentController,
  listCommentsOnUserController,
  patchCommentController,
  softDeleteCommentController,
} from "../controllers";
import {
  verifyAuth,
  verifyCommentIdParameter,
  verifyRequestPerSchema,
  verifyUserIdParameter,
} from "../middleware";
import { commentRequestSchema } from "../schemas";

export const commentsRoutes = Router();

commentsRoutes.post(
  "/comments/:id",
  verifyUserIdParameter,
  verifyAuth,
  verifyRequestPerSchema(commentRequestSchema),
  createCommentController
);

commentsRoutes.get(
  "/comments/:id",
  verifyUserIdParameter,
  verifyAuth,
  listCommentsOnUserController
);

commentsRoutes.patch(
  "/comments/:id",
  verifyCommentIdParameter,
  verifyAuth,
  verifyRequestPerSchema(commentRequestSchema),
  patchCommentController
);

commentsRoutes.delete(
  "/comments/:id",
  verifyCommentIdParameter,
  verifyAuth,
  softDeleteCommentController
);
