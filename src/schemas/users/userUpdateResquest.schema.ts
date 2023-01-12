import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../../interfaces/users";

export const userUpdateRequestSchema: SchemaOf<IUserUpdate> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    avatar: yup.string().notRequired(),
  });
