import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Pets } from "../entities/petsEntity"
import AppError from "../errors/AppError"

export const verifyPetIdParameter = async (req: Request, res: Response, next: NextFunction) => {
    const petRepo = AppDataSource.getRepository(Pets);

    const { id } = req.params;
    
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!regexExp.test(id)) throw new AppError ("Invalid input, id must be a valid uuid", 401);
    
    const pet = await petRepo.findOneBy({id: id});
    if (!pet) throw new AppError ("Pet not found!", 404);

    return next();
};