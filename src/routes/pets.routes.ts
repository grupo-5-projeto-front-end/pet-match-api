import { Router } from "express";

import { listPetsController, createPetController, listPetByIdController, listPetsByUserController, patchUPetController, softDeletePetController } from "../controllers";
import { verifyAuth, verifyPetIdParameter, verifyRequestPerSchema, verifyUserIdParameter } from "../middleware";

import { petRequestSchema, petUpdateRequestSchema } from "../schemas";

export const petsRoutes = Router();

petsRoutes.get("/pets", listPetsController);
petsRoutes.get("/pets/:id", verifyPetIdParameter, listPetByIdController);
petsRoutes.get("/pets/user/:id",verifyUserIdParameter, verifyAuth, listPetsByUserController);


petsRoutes.post("/pets",verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.patch(`/pets/:id`, verifyPetIdParameter, verifyRequestPerSchema(petUpdateRequestSchema), verifyAuth, patchUPetController) 
petsRoutes.delete(`/pets/:id`, verifyPetIdParameter, verifyAuth, softDeletePetController) 

