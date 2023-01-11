import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserResponse } from '../../interfaces/users'
import { addressSchema, commentResponseSchema } from '../index'

export const userResponseSchema: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    avatar: yup.string().required(),
    address: addressSchema,
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
});

export const userArraySchema: SchemaOf<IUserResponse[]> = yup.array(userResponseSchema);