import { Router } from "express";

import { listPetsController, createPetController, listPetByIdController, patchUPetController } from "../controllers";
import { verifyAuth, verifyPetIdParameter, verifyRequestPerSchema } from "../middleware";

import { petRequestSchema } from "../schemas";
import { petUpdateRequestSchema } from "../schemas/pets/petRequest.schema";

export const petsRoutes = Router();

petsRoutes.get("/pets", listPetsController);
petsRoutes.get("/pets/:id", verifyPetIdParameter, listPetByIdController);


petsRoutes.post("/pets",verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.post(`/pets/:id`, verifyPetIdParameter, verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.patch(`/pets/:id`, verifyPetIdParameter, verifyRequestPerSchema(petUpdateRequestSchema), verifyAuth, patchUPetController) 


