import { AppDataSource } from "../../data-source";
import { Likes } from "../../entities/likesEntity";
import { Pets } from "../../entities/petsEntity";
import { Users } from "../../entities/usersEntity";
import { petResponseSchema } from "../../schemas";

export const createLikeService = async (
  userId: string,
  petId: string
): Promise<Pets> => {
  const likesRepo = AppDataSource.getRepository(Likes);
  const usersRepo = AppDataSource.getRepository(Users);
  const petsRepo = AppDataSource.getRepository(Pets);

  const user = await usersRepo.findOneBy({ id: userId });
  const pet = await petsRepo.findOneBy({ id: petId });

  const newLike = likesRepo.create({
    pet: pet,
    user: user,
  });

  await likesRepo.save(newLike);

  const response = await petsRepo.findOne({
    where: {
      id: petId,
    },
    relations: {
      likes: true,
    },
  });

  const validatedResponse = petResponseSchema.validate(response, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validatedResponse;
};
