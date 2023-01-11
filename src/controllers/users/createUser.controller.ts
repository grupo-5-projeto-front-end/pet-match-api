import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import { createUserService } from "../../services";

export const createUserController = async (req: Request, res: Response) => {
    const body: IUserRequest = req.body;
    const user = await createUserService(body);

    return res.status(201).json(user);
};