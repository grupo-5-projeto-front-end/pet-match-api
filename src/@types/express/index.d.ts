import * as express from "express";
import { iJwtPayload } from "../../interfaces/express";

declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
      user: iJwtPayload;
    }
  }
}
export {};
