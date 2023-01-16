import { AppDataSource } from "../../data-source"
import { Likes } from "../../entities/likesEntity"
import { Pets } from "../../entities/petsEntity"


export const listLikesService = async (petId: string) => {
    const likesRepo = AppDataSource.getRepository(Likes)
    const petsRepo = AppDataSource.getRepository(Pets);
    const pet = await petsRepo.findOneBy({ id: petId });

    const likesList = await likesRepo.find({where: {pet}})

    return likesList
}