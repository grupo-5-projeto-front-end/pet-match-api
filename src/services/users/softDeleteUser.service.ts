import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/usersEntity";
import AppError from "../../errors/AppError";

export const softDeleteUserService = async (userId: string): Promise<void> => {
    const userRepo = AppDataSource.getRepository(Users);

    const userToBeDeleted = await userRepo.findOne({
        where: {
            id: userId
        },
        withDeleted: true
    })
    
    if(userToBeDeleted.isActive == false){
        throw new AppError("This user has been deleted", 400)
    }

    if(!userToBeDeleted){
        throw new AppError("User not found.", 404)
    }


    await userRepo.softRemove(userToBeDeleted)
    const user = await userRepo.save({
        ...userToBeDeleted,
        isActive: false
    })

    return 
}