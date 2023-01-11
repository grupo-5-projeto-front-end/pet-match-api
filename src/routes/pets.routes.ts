import { Router } from "express";
import { listPetsController, createPetController } from "../controllers";
import { verifyAuth, verifyPetIdParameter, verifyRequestPerSchema } from "../middleware";
import { petRequestSchema } from "../schemas";

export const petsRoutes = Router();

petsRoutes.get("/pets", listPetsController)

petsRoutes.post("/pets",verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.post(`/pets/:id`, verifyPetIdParameter, verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 