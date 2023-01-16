import { Request, Response } from "express";
import { listPetsByUserService } from "../../services";

export const listPetsByUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const pets = await listPetsByUserService(id);
  return res.status(200).json(pets);
};
