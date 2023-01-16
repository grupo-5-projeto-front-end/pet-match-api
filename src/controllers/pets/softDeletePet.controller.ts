import { Request, Response } from "express";
import { softDeletePetService } from "../../services";

export const softDeletePetController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const userId: string = req.user.id;
  const pet = await softDeletePetService(id, userId);
  return res.status(204).json(pet);
};
