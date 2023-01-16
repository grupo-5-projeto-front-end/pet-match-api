import { Request, Response } from "express";
import { createLikeService } from "../../services";

export const createLikeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;
  const petId = req.params.id;
  const newLike = await createLikeService(userId, petId);
  return res.status(201).json(newLike);
};
