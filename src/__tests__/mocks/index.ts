import { IUserRequest } from "../../interface/users";


export const mockedUser: IUserRequest ={
    name: "usuarioTeste",
    email: "petmatch@mail.com",
    password: "123456",
    phone:"21971717171",
    isActive: true,
    avatar:"img",
    adressId:{
        city:"rua do Pets teste",
        state: "Narnia",
        street: "Rua dos pets Test",
        number: "140",
        zipCode: "22717171"
    }

}