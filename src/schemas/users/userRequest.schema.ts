import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserRequest } from '../../interfaces/users'
import { addressSchema } from '../index'


export const userRequestSchema:SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    avatar: yup.string().required(),
    adress: addressSchema
})


