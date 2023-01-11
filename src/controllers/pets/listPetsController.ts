import { Request, Response } from "express"
import { listPetsService } from "../../services/pets"

export const listPetsController = async (req: Request, res: Response) => {
    const data = await listPetsService()
    return res.status(200).json(data)
}