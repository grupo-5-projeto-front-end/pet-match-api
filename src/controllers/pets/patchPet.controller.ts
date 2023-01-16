import { Request, Response } from "express";
import { IPetRequest } from "../../interfaces/pets";
import { patchPetService } from "../../services";

export const patchUPetController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: IPetRequest = req.body;
  const id: string = req.params.id;
  const userId: string = req.user.id;
  const pet = await patchPetService(body, id, userId);
  return res.status(200).json(pet);
};
