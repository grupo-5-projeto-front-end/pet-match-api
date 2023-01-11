import { IUserRequest } from "../../interfaces/users";

export const mockedUser = {
  name: "usuarioTeste",
  email: "petmatch@mail.com",
  password: "123456",
  phone: "21971717171",
  avatar: "img",
  adress: {
    city: "rua do Pets teste",
    state: "Narnia",
    street: "Rua dos pets Test",
    number: "140",
    zipCode: "22717171",
  },
};

export const mockedLogin = {
  email: "petmatch@mail.com",
  password: "123456",
};

export const mockedPet = {
  name: "petTeste",
  sex: "Macho",
  category: "Cachorro",
  breed: "Pinscher",
  age: "5",
  bio: "Biografia de teste do pet",
  avatar: "img",
};

//********* MockedComments *********

export const mockedComment = {
  userId: "",
  comment: "este é um comentário",
}
