import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/usersEntity";

export const loginService = async (body: IUserLogin): Promise<{token: string}> => {
    const { email, password } = body;
    const userRepo = AppDataSource.getRepository(Users);
    
    const user = await userRepo.findOneBy({email: email});
  
    const passwordMatches = await compare(password, user.password);

    if (!user || !passwordMatches) throw new AppError ("Wrong email/password", 403);

    if(!user.isActive) throw new AppError("User is inactive", 400);

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "24h", subject: user.id });

    return { token };
};