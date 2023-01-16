import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/commentsEntity";
import { Users } from "../../entities/usersEntity";
import { ICommentsRequest } from "../../interfaces/comments";
import { commentResponseSchema } from "../../schemas";

export const createCommentService = async (
  body: ICommentsRequest,
  targetId: string,
  commenterId: string
) => {
  body.userId = commenterId;

  const userRepo = AppDataSource.getRepository(Users);
  const commentRepo = AppDataSource.getRepository(Comments);

  const fullComment = commentRepo.create(body);
  const createdComment = await commentRepo.save(fullComment);

  const user = await userRepo.findOne({
    where: {
      id: targetId,
    },
    relations: {
      comments: true,
    },
  });
  user.comments = [...user.comments, createdComment];
  await userRepo.save(user);

  const validateResponse = await commentResponseSchema.validate(fullComment, {
    stripUnknown: true,
  });

  return validateResponse;
};
