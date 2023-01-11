import { IUserResponse } from "../users";


export interface IPetRequest{
    name:string,
    sex:string,
    category: string,
    breed: string,
    age:string,
    bio:string,
    avatar?:string,
}


export interface IPetResponse{
    name:string,
    sex:string,
    category: string,
    breed: string,
    age:string,
    bio:string,
    avatar?:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date
    user: IUserResponse
    deletedAt?: Date
}