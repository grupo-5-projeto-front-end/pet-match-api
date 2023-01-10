import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const verifyRequestPerSchema = (schema: { validate: (arg0: any, arg1: { abortEarly: boolean; stripUnknown: boolean; }) => any }) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validate = await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        req.validatedBody = validate;

        return next();
    } catch (error) {
        throw new AppError(error.errors, 401);
    };
};

//Quando utilizar esse middleware nas rotas, ele precisa ser passado como argumento para as rotas