import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/usersEntity";
import { userPetsResponseSchema } from "../../schemas/pets/petResponse.schema";

export const listPetsByUserService = async (id: string) => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOne({
    where: { id: id },
    relations: { pets: true },
  });
  const validateResponse = await userPetsResponseSchema.validate(user, {
    stripUnknown: true,
  });

  return validateResponse;
};
