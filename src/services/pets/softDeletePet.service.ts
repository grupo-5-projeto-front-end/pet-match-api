import { AppDataSource } from "../../data-source";
import { Pets } from "../../entities/petsEntity";
import AppError from "../../errors/AppError";

export const softDeletePetService = async (petId: string, userId: string) => {
  const petRepo = AppDataSource.getRepository(Pets);

  const pet = await petRepo.findOne({
    where: { id: petId },
    relations: { user: true },
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  };

  if (pet.user.id !== userId) {
    throw new AppError("No access permission", 403);
  };

  await petRepo.softRemove(pet);
  await petRepo.update(petId, { isActive: false });

  return {};
};
