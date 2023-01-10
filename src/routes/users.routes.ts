import { Router } from "express";
import { createUserController } from "../controllers";
import { verifyRequestPerSchema } from "../middleware";

export const usersRoutes = Router();

usersRoutes.post("/users", createUserController); //Falta a verificação do request utilizando o schema do YUP, que ainda não foi feito.