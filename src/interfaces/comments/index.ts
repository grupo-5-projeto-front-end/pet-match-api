export interface ICommentsRequest{
    comment: string,
    userId?: string
}

export interface ICommentsRequestDummy {
    comment: string
}

export interface IComments{
    id: string;
    comment: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
