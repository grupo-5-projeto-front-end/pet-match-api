import { Router } from "express";
import { listPetsController } from "../controllers";
import { verifyPetIdParameter } from "../middleware";

export const petsRoutes = Router()

petsRoutes.get("/pets", listPetsController)