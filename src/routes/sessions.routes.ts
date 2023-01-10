import { Router } from "express"
import { loginController } from "../controllers";
import { verifyRequestPerSchema } from "../middleware";

export const sessionsRoutes = Router();

sessionsRoutes.post("/login", loginController); //Precisa colocar o middleware de verificação, mas schemas não estão prontos