import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/commentsEntity";
import AppError from "../../errors/AppError";

export const softDeleteCommentService = async (
  userId: string,
  commentId: string
): Promise<Object> => {
  const commentsRepo = AppDataSource.getRepository(Comments);

  const comment = await commentsRepo.findOneBy({ id: commentId });

  if (comment.userId != userId) {
    throw new AppError("You don't have permission to do that", 403);
  }

  if (comment.deletedAt != null) {
    throw new AppError("You cant't do that", 400);
  }

  await commentsRepo.softRemove(comment);
  return {};
};
