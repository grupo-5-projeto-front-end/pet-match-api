import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Comments } from "../entities/commentsEntity";
import AppError from "../errors/AppError";

export const verifyCommentIdParameter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const commentRepo = AppDataSource.getRepository(Comments);
  const { id } = req.params;
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (!regexExp.test(id)) {
    throw new AppError("Invalid input, id must be a valid uuid", 401);
  };
  const comment = await commentRepo.findOneBy({ id: id });
  if (!comment) {
    throw new AppError("Comment not found!", 404);
  };
  return next();
};
