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
);

likesRoutes.delete("/likes/:id", verifyAuth, deleteLikeController);
likesRoutes.get(
  "/likes/:id",
  verifyAuth,
  verifyPetIdParameter,
  listLikesController
);
