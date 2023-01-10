import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserUpdate } from '../../interfaces/users'

export const userUpdateRequestSchema:SchemaOf<IUserUpdate> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    avatar: yup.string().required()
})