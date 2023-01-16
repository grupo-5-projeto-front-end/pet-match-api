import { AppDataSource } from "../../data-source";
import { Pets } from "../../entities/petsEntity";
import { IPetResponse } from "../../interfaces/pets";

export const listPetsService = async (): Promise<IPetResponse[]> => {
  const petsRepo = AppDataSource.getRepository(Pets);
  const petsList = await petsRepo.find();
  return petsList;
};
