import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Addresses } from "../../entities/addressesEntity";
import { Users } from "../../entities/usersEntity";
import AppError from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";

export const createUserService = async (body: IUserRequest): Promise<Users> => {
    const { email, address } = body;
    const { state, zipCode } = address;

    if (zipCode.length !== 8) throw new AppError ("Invalid zip code", 400)
    if (state.length !== 2) throw new AppError ("Invalid state. Can only have 2 characters", 400)

    const userRepo = AppDataSource.getRepository(Users);
    const addressRepo = AppDataSource.getRepository(Addresses);

    const createdAddress = await addressRepo.save(address);
    body.address = createdAddress

    const user = await userRepo.findOneBy({email: email});
    if (user) throw new AppError ("User already exists", 409);

    const newUser = userRepo.create(body);
    const hashedPassword = await hash(newUser.password, 10);
    newUser.password = hashedPassword;
    await userRepo.save(newUser);

    delete newUser.password;
    delete newUser.deletedAt;

    return newUser;
};