import { AppDataSource } from "../../data-source";
import { Pets } from "../../entities/petsEntity";
import { petResponseSchema } from "../../schemas";

export const listPetsByUserService = async (id: string) => {
    const petsRepo = AppDataSource.getRepository(Pets);

    const pets = await petsRepo.find({
        where: {
            id
        }
       
    });

    const validateArray = await petResponseSchema.validate(pets);

    return validateArray;
};