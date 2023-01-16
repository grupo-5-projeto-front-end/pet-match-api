import { Request, Response } from "express";
import { listCommentsOnUserService } from "../../services";

export const listCommentsOnUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const user = await listCommentsOnUserService(id);
  return res.status(200).json(user);
};
