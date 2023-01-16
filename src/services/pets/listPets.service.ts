import { AppDataSource } from "../../data-source";
import { Pets } from "../../entities/petsEntity";

export const listPetsService = async () => {
  const petsRepo = AppDataSource.getRepository(Pets);
  const petsList = await petsRepo.find();
  return petsList;
};
