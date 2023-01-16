import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserCommentResponse } from "../../interfaces/users";
import { addressSchema } from "../address/address.schema";
import { commentResponseSchema } from "../comments/commentsResponse.schema";

export const userCommentResponseSchema: SchemaOf<IUserCommentResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    avatar: yup.string().required(),
    address: addressSchema,
    comments: yup.array(commentResponseSchema),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  });
