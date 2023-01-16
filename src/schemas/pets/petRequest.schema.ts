import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPetRequest } from "../../interfaces/pets";

export const petRequestSchema: SchemaOf<IPetRequest> = yup.object().shape({
  name: yup.string().required(),
  sex: yup.string().required(),
  category: yup.string().required(),
  breed: yup.string().required(),
  age: yup.string().required(),
  bio: yup.string().required(),
  avatar: yup.string(),
});

export const petUpdateRequestSchema: SchemaOf<IPetRequest> = yup
  .object()
  .shape({
    name: yup.string(),
    sex: yup.string(),
    category: yup.string(),
    breed: yup.string(),
    age: yup.string(),
    bio: yup.string(),
    avatar: yup.string(),
  });
