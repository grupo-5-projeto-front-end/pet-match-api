import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IPetResponse } from '../../interfaces/pets'
import { userResponseSchema } from '../users/userResponse.schema'

export const petResponseSchema:SchemaOf<IPetResponse> = yup.object().shape({
    name: yup.string().required(),
    sex: yup.string().required(),
    category: yup.string().required(),
    breed: yup.string().required(),
    age: yup.string().required(),
    bio: yup.string().required(),
    avatar: yup.string(),
    isActive: yup.boolean().required(),
    user: userResponseSchema,
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    deletedAt: yup.date()
})