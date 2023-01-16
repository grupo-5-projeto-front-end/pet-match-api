import { Request, Response } from "express";
import { softDeleteCommentService } from "../../services";

export const softDeleteCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;
  const commentId = req.params.id;
  const response = await softDeleteCommentService(userId, commentId);
  return res.status(204).json(response);
};
