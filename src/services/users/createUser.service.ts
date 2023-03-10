import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Addresses } from "../../entities/addressesEntity";
import { Users } from "../../entities/usersEntity";
import AppError from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { userResponseSchema } from "../../schemas";

export const createUserService = async (body: IUserRequest) => {
  const { email, address } = body;
  const { state, zipCode } = address;

  const userRepo = AppDataSource.getRepository(Users);
  const addressRepo = AppDataSource.getRepository(Addresses);

  const user = await userRepo.findOne({
    where: { email: email },
    withDeleted: true,
  });

  if (user && !user.isActive) {
    throw new AppError("User already exists, but is inactive", 409);
  };
   
  if (user) {
    throw new AppError("User already exists", 409);
  };

  if (zipCode.length !== 8) {
    throw new AppError("Invalid zip code", 400);
  };

  if (state.length !== 2) {
    throw new AppError("Invalid state. Can only have 2 characters", 400);
  };

  const createdAddress = await addressRepo.save(address);
  body.address = createdAddress;

  const newUser = userRepo.create(body);
  const hashedPassword = await hash(newUser.password, 10);
  newUser.password = hashedPassword;
  await userRepo.save(newUser);

  const validateResponse = await userResponseSchema.validate(newUser, {
    stripUnknown: true,
  });

  return validateResponse;
};
