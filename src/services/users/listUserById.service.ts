import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/usersEntity"
import { userResponseSchema } from "../../schemas"

export const listUserByIdService = async (id: string) => {
    const userRepo = AppDataSource.getRepository(Users);

    const user = await userRepo.findOne({
        where: {
            id: id,
        },
        relations: {
            address: true
        }
    });

    const validateResponse = await userResponseSchema.validate(user, {
        stripUnknown: true
    });
    
    return validateResponse;
};