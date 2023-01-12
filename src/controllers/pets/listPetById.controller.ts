import { Request, Response } from "express";
import { listPetByIdService } from "../../services";

export const listPetByIdController = async (req: Request, res: Response) => {
    const petId: string = req.params.id
    const pet = await listPetByIdService(petId)
    return res.status(200).json(pet)
}