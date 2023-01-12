import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/commentsEntity";
import AppError from "../../errors/AppError";
import { IComments, ICommentsRequestDummy } from "../../interfaces/comments";
import { commentResponseSchema } from "../../schemas";

export const patchCommentService = async (
  body: ICommentsRequestDummy,
  userId: string,
  commentId: string
): Promise<IComments> => {
  const commentsRepo = AppDataSource.getRepository(Comments);

  let comment = await commentsRepo.findOneBy({ id: commentId });

  if (comment.userId != userId) {
    throw new AppError("You don't have permission to do that", 403);
  }

  await commentsRepo.save({
    id: commentId,
    ...body,
  });

  comment = await commentsRepo.findOneBy({ id: commentId });

  const validateResponse = await commentResponseSchema.validate(comment, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validateResponse;
};
