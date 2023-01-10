
export interface IAddressRequest {
    id?:string,
    city:string,
    state: string
    street: string
    number?: string
    zipCode: string
}

export interface IUserRequest {
  name: string,
  email: string,
  password: string,
  phone:string,
  avatar:string,
  isActive:boolean,
  adressId: IAddressRequest
}

export interface IUserResponse {
  name: string,
  email: string,
  password: string,
  phone:string,
  avatar:string,
  isActive:boolean,
  createdAt:Date,
  updatedAt:Date
  adressId: IAddressRequest
}


