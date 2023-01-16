import * as yup from "yup";
import { SchemaOf } from "yup";
import { likes } from "../../interfaces/likes";
import { userResponseSchema } from "../users/userResponse.schema";

export const likeResponseSchema: SchemaOf<likes> = yup.object().shape({
  userId: yup.string().required(),
  petId: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  user: userResponseSchema,
});
