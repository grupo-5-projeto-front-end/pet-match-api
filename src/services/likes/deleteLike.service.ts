import { AppDataSource } from "../../data-source";
import { Likes } from "../../entities/likesEntity";
import { Users } from "../../entities/usersEntity";
import AppError from "../../errors/AppError";

export const deleteLikeService = async (likeId: string, userId: string) => {
  const userRepo = AppDataSource.getRepository(Users);
  const likeRepo = AppDataSource.getRepository(Likes);

  const user = await userRepo.findOneBy({ id: userId });

  const like = await likeRepo.findOne({
    where: { id: likeId },
    relations: {
      user: true,
      pet: true,
    },
  });

  if (!like) {
    throw new AppError("you didn't like it", 400);
  };

  if (user.id !== like.user.id) {
    throw new AppError("You don't have permission to do that", 403);
  };
  await likeRepo.delete(like);
  return {};
};
