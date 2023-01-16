import { NextFunction, Response, Request } from "express";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";
import { iJwtPayload } from "../interfaces/express";

export const verifyAuth = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;
  if (!token) throw new AppError("Invalid Token", 401);

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY,
    (error: Error, decoded: iJwtPayload) => {
      if (error) {
        throw new AppError(error.message, 401);
      }

      req.user = {
        id: decoded.sub,
        email: decoded.email,
      };
    }
  );
  return next();
};
