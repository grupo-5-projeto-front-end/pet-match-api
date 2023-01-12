import { Request, Response } from "express";
import { IPetRequest } from "../../interfaces/pets";
import { patchPetService } from "../../services";

export const patchUPetController = async(req: Request, res:Response)=>{
    const body: IPetRequest = req.body
    const {id} = req.params
    const userId = req.user.id
    const pet = await patchPetService(body, id, userId)
    return res.status(200).json(pet)
    
} 