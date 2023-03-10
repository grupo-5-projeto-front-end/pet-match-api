import { AppDataSource } from "../../data-source";
import { Likes } from "../../entities/likesEntity";

export const listLikesService = async (petId: string) => {
  const likesRepo = AppDataSource.getRepository(Likes);

  const likesList = await likesRepo
    .createQueryBuilder("l")
    .where("l.petId = :petid", {
      petid: petId,
    })
    .getMany();

  return likesList;
};
