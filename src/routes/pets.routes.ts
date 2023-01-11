import { Router } from "express";
import { createPetController } from "../controllers";
import { verifyAuth, verifyPetIdParameter } from "../middleware";


export const petsRoutes = Router();

petsRoutes.post("/pets", verifyAuth, createPetController) 