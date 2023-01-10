import * as express from "express"
import { iJwtPayload } from "../../interfaces/express";

declare global {
    namespace Express {
      interface Request {
       validatedBody: object //Tipagem do retorno do objeto validado no middleware de verificação de request
       user: iJwtPayload
      }
    }

  }
  
  export {};