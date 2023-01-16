import { Request, Response } from "express";
import { patchCommentService } from "../../services";

export const patchCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;
  const commentId = req.params.id;
  const comment = await patchCommentService(req.body, userId, commentId);
  return res.status(200).json(comment);
};
