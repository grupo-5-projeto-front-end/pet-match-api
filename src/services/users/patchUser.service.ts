import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/usersEntity";
import AppError from "../../errors/AppError";
import { IUserUpdate } from "../../interfaces/users";
import { updateUserResponseSchema } from "../../schemas";

export const patchUserService = async (
  body: IUserUpdate,
  UserId: string,
  id: string
) => {
  if (UserId != id) {
    throw new AppError("You don't have permission to do that");
  };

  if (body.password) {
    body.password = await hash(body.password, 10);
  };

  const userRepo = AppDataSource.getRepository(Users);

  await userRepo.save({
    id: UserId,
    ...body,
  });

  const findUser = await userRepo.findOneBy({ id: UserId });

  const validateResponse = await updateUserResponseSchema.validate(findUser, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validateResponse;
};
