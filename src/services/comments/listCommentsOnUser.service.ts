import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/usersEntity";
import { userCommentResponseSchema } from "../../schemas";

export const listCommentsOnUserService = async (id: string) => {
    const userRepo = AppDataSource.getRepository(Users);

    const user = await userRepo.findOne({
        where: {
            id: id
        },
        relations: {
            comments: true,
            address: true
        }
    });

    const validateArray = await userCommentResponseSchema.validate(user, {stripUnknown: true});

    return validateArray;
};