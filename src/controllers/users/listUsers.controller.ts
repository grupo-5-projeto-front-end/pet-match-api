import { Request, Response } from "express";
import { listUsersService } from "../../services";

export const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();
  return res.status(200).json(users);
};
