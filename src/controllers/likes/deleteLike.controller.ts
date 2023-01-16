import { Request, Response } from "express";
import { deleteLikeService } from "../../services";

export const deleteLikeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const likeId: string = req.params.id;
  const userId: string = req.user.id;
  const disliked = await deleteLikeService(likeId, userId);
  return res.status(204).json(disliked);
};
