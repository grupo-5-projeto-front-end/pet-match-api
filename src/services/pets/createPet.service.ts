import { AppDataSource } from "../../data-source";
import { Pets } from "../../entities/petsEntity";
import { Users } from "../../entities/usersEntity";
import { IPetRequest } from "../../interfaces/pets";
import { petResponseSchema } from "../../schemas";

export const createPetService = async (body: IPetRequest, userId: string) => {
  const petRep = AppDataSource.getRepository(Pets);
  const userRep = AppDataSource.getRepository(Users);

  const user = await userRep.findOne({
    where: { id: userId },
    relations: { pets: true },
  });

  const newPet = petRep.create({
    ...body,
    user: user,
  });
  await petRep.save(newPet);

  const validateResponse = await petResponseSchema.validate(newPet, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validateResponse;
};
