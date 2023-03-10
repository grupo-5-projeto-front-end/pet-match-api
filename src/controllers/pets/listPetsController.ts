import { Request, Response } from "express";
import { listPetsService } from "../../services";

export const listPetsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await listPetsService();
  return res.status(200).json(data);
};
