import { IAddressRequest } from "../address"
import { IComments } from "../comments"

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  address: IAddressRequest;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: IAddressRequest;
} //sem passsword
export interface IUserCommentResponse extends IUserResponse {
  comments: IComments[]
};

export interface IUserLogin{
  email: string,
  password: string
};

export interface IUserUpdate {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface IUserResponseUpdate {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  updatedAt: Date;
  createdAt: Date;
} //sem password e update atualizado
