export interface ICommentsRequest{
    comment: string,
    userId?: string
}

export interface ICommentsRequestDummy {
    comment: string
}

export interface IComments{
    id:string
    comment: string
    userId: string //usuario que fez o comentario, pegar pelo token
    createdAt: Date,
    updatedAt: Date,
}