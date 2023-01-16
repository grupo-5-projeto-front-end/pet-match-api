import type { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const message = { message: err.message };
    return res.status(err.statusCode).json(message);
  }

  console.error(err);
  return res.status(500).json({ message: "Internal Server Error." });
};

export default errorHandler;
