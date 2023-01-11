import { Router } from "express";
import { createPetController } from "../controllers";
import { verifyAuth, verifyPetIdParameter, verifyRequestPerSchema } from "../middleware";
import { petRequestSchema } from "../schemas";


export const petsRoutes = Router();

petsRoutes.post("/pets",verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 
petsRoutes.post(`/pets/:id`,verifyPetIdParameter, verifyRequestPerSchema(petRequestSchema), verifyAuth, createPetController) 