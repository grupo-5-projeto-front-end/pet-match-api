import { Request, Response } from "express";
import { ICommentsRequest } from "../../interfaces/comments";
import { createCommentService } from "../../services";

export const createCommentController = async (req: Request, res: Response) => {
    const body: ICommentsRequest = req.body;
    const targetId: string = req.params.id
    const commenterId: string = req.user.id
    const comment = await createCommentService(body, targetId, commenterId);

    return res.status(201).json(comment);
};