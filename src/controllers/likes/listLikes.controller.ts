import { Request, Response } from "express";
import { listLikesService } from "../../services";

export const listLikesController = async (req: Request, res: Response) => {
  const petId = req.params.id;
  const data = await listLikesService(petId);
  return res.status(200).json(data);
};
