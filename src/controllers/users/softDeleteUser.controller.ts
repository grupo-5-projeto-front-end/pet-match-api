import { Response, Request } from "express";
import { softDeleteUserService } from "../../services/users/softDeleteUser.service";

export const softDeleteUserController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = req.user.id;
  const data = await softDeleteUserService(id);
  return res.status(204).json(data);
};
