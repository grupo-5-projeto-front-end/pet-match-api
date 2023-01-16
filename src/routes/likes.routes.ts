import { Router } from "express";
import {
  createLikeController,
  deleteLikeController,
  listLikesController,
} from "../controllers";
import { verifyAuth, verifyPetIdParameter } from "../middleware";

export const likesRoutes = Router();

likesRoutes.post(
  "/likes/:id",
  verifyPetIdParameter,
  verifyAuth,
  createLikeController
); //ID passado por parâmetro, deve ser do pet que está recebendo o like

likesRoutes.delete("/likes/:id", verifyAuth, deleteLikeController);
likesRoutes.get(
  "/likes/:id",
  verifyPetIdParameter,
  verifyAuth,
  listLikesController
);
