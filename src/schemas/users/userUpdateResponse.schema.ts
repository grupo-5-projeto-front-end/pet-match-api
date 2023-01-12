import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserResponseUpdate } from "../../interfaces/users";

export const updateUserResponseSchema: SchemaOf<IUserResponseUpdate> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    avatar: yup.string().required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
  });
