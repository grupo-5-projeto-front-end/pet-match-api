import { Router } from "express";
import { listPetsController, createPetController, listPetByIdController } from "../controllers";
import { verifyAuth, verifyPetIdParameter, verifyRequestPerSchema } from "../middleware";
import { petRequestSchema } from "../schemas";

export const petsRoutes = Router();

petsRoutes.get("/pets", listPetsController)
petsRoutes.get("/pets/:id", listPetByIdController)

petsRoutes.post("/pets",verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.post(`/pets/:id`, verifyPetIdParameter, verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 