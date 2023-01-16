import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/usersEntity";
import AppError from "../errors/AppError";

export const verifyUserIdParameter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(Users);
  const { id } = req.params;
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (!regexExp.test(id)){
    throw new AppError("Invalid input, id must be a valid uuid", 401);
  }
    

  const user = await userRepo.findOneBy({ id: id });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return next();
};
