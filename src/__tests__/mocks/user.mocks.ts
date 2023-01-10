import { IUserLogin, IUserRequest, IUserUpdate } from "../../interfaces/users"


export const mockedUser: IUserRequest ={
    name: "usuarioTeste",
    email: "petmatch@mail.com",
    password: "123456",
    phone:"21971717171",
    avatar:"img",
    adress:{
        city:"rua do Pets teste",
        state: "Narnia",
        street: "Rua dos pets Test",
        number: "140",
        zipCode: "22717171"
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