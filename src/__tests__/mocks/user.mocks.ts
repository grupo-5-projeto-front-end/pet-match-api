import { IUserLogin, IUserRequest, IUserUpdate } from "../../interfaces/users"

export const mockedUser: IUserRequest ={
    name: "usuarioTeste",
    email: "petmatch@mail.com",
    password: "123456",
    phone:"21971717171",
    avatar:"img",
    address:{
        city: "São Paulo",
        state: "SP",
        street: "Rua dos pets Test",
        number: "140",
        zipCode: "00000000"
    }
}

export const mockedUserLogin:IUserLogin ={
    email:"petmatch@mail.com",
    password: "123456"
}
export const mockedUpdate:IUserUpdate ={
    name: "usuarioTeste",
    email: "petmatch@mail.com",
    password: "123456",
    phone:"21971717171",
    avatar:"img",
}