import { AppDataSource } from "../../data-source"
import { Pets } from "../../entities/petsEntity"
import { IPetResponse } from "../../interfaces/pets"
import { petResponseSchema } from "../../schemas"

export const listPetByIdService = async (petId: string):Promise<IPetResponse> => {
    const petsRepo = AppDataSource.getRepository(Pets)

    const pet = await petsRepo.findOneBy({
        id: petId
    })

    const petToBeReturned = await petResponseSchema.validate(pet, {
        stripUnknown: true,
        abortEarly: false
    })

    return petToBeReturned
}