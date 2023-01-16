import { Request, Response } from "express";
import { IPetRequest } from "../../interfaces/pets";
import { createPetService } from "../../services/pets/createPet.service";

export const createPetController = async (req: Request, res: Response) => {
  const body: IPetRequest = req.body;
  const userId = req.user.id;
  const pet = await createPetService(body, userId);
  return res.status(201).json(pet);
};
