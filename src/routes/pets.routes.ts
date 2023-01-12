import { Router } from "express";

import { listPetsController, createPetController, listPetByIdController, patchUPetController } from "../controllers";
import { verifyAuth, verifyPetIdParameter, verifyRequestPerSchema } from "../middleware";

import { petRequestSchema, petUpdateRequestSchema } from "../schemas";

export const petsRoutes = Router();

petsRoutes.get("/pets", listPetsController);
petsRoutes.get("/pets/:id", verifyPetIdParameter, listPetByIdController);


petsRoutes.post("/pets",verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.patch(`/pets/:id`, verifyPetIdParameter, verifyRequestPerSchema(petUpdateRequestSchema), verifyAuth, patchUPetController) 

