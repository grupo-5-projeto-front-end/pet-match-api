import { IUserResponse } from "../users"

export interface likesRequst{
    userId: string 
    petId:string
  
}
export interface likes{
    userId: string 
    petId:string
    createdAt:Date,
    updatedAt:Date
    user:IUserResponse
}