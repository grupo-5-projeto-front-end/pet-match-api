import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/usersEntity";
import { userArraySchema } from "../../schemas/users/userResponse.schema";

export const listUsersService = async (): Promise<any> => {
    const userRepo = AppDataSource.getRepository(Users);

    const users = await userRepo.find({
        relations: {
            address: true
        }
    });

    const validatedArray = await userArraySchema.validate(users, {stripUnknown: true});

    return validatedArray;
};