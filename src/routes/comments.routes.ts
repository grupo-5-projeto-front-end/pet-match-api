import { Router } from "express"
import { createCommentController, listCommentsOnUserController } from "../controllers";
import { verifyAuth, verifyRequestPerSchema, verifyUserIdParameter } from "../middleware";
import { commentRequestSchema } from "../schemas";

export const commentsRoutes = Router();

commentsRoutes.post("/comments/:id", verifyUserIdParameter, verifyAuth, verifyRequestPerSchema(commentRequestSchema), createCommentController); //Id passado é do USUÁRIO a ser comentado

commentsRoutes.get("/comments/:id", verifyUserIdParameter, verifyAuth, listCommentsOnUserController);