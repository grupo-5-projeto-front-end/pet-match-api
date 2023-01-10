import { IUserResponse } from "../users"

export interface ICommentsRequest{
    comment:string
}

export interface IComments{
    comment:string
    userId:string //usuario que fez o comentario, pegar pelo token
    createdAt:Date,
    updatedAt:Date,
    deletedAt?: Date
}