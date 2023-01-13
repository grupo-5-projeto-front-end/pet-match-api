import { Router } from "express";
import { createLikeController, deleteLikeController } from "../controllers";
import { verifyAuth, verifyPetIdParameter } from "../middleware";

export const likesRoutes = Router();

likesRoutes.post(
  "/likes/:id",
  verifyPetIdParameter,
  verifyAuth,
  createLikeController
); //ID passado por parâmetro, deve ser do pet que está recebendo o like

 likesRoutes.delete("/likes/:id",verifyAuth, deleteLikeController )
