import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/usersEntity"

export const listUsersService = async (): Promise<Users[]> => {
    const userRepo = AppDataSource.getRepository(Users);

    const users = await userRepo.find({
        relations: {
            address: true
        }
    });
    
    users.forEach(e => delete e.password);

    return users;
}