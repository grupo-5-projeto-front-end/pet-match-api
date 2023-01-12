import { Request, Response } from "express";
import { listUserByIdService } from "../../services";

export const listUserByIdController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user = await listUserByIdService(id)

    return res.status(200).json(user)
}