import { Request, Response } from "express";
import { deleteLikeService } from "../../services";

export const deleteLikeController = async (req:Request,res: Response) => {
    const likeID =  req.params.id
    const userId = req.user.id
    const desliked = await deleteLikeService(likeID, userId,)
    return res.status(204).json(desliked)
}