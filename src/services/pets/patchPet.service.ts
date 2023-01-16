import { AppDataSource } from "../../data-source";
import { Pets } from "../../entities/petsEntity";
import AppError from "../../errors/AppError";
import { IPetRequest } from "../../interfaces/pets";
import { petResponseSchema } from "../../schemas";

export const patchPetService = async (
  body: IPetRequest,
  petId: string,
  userId: string
) => {
  const petRepo = AppDataSource.getRepository(Pets);

  const pet = await petRepo.findOne({
    where: { id: petId },
    relations: { user: true },
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  };

  if (pet.user.id !== userId) {
    throw new AppError("no access permission", 403);
  };

  const PetUpdate = petRepo.create({
    ...pet,
    ...body,
  });
  await petRepo.save(PetUpdate);

  const resPet = await petResponseSchema.validate(PetUpdate, {
    stripUnknown: true,
    abortEarly: false,
  });
  return resPet;
};
