import { Request, Response } from "express";
import { patchUserService } from "../../services";

export const patchUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const patchUser = await patchUserService(req.body, req.user.id, id);

  return res.status(200).json(patchUser);
};
