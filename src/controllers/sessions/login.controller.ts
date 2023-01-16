import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services";

export const loginController = async (req: Request, res: Response) => {
  const body: IUserLogin = req.body;
  const token = await loginService(body);
  return res.status(200).json(token);
};
