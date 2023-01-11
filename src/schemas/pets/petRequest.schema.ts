import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IPetRequest } from '../../interfaces/pets'
import { userResponseSchema } from '../users/userResponse.schema'

export const petRequestSchema:SchemaOf<IPetRequest> = yup.object().shape({
    name: yup.string().required(),
    sex: yup.string().required(),
    category: yup.string().required(),
    breed: yup.string().required(),
    age: yup.string().required(),
    bio: yup.string().required(),
    avatar: yup.string(),
    isActive: yup.boolean().required(),
    user: userResponseSchema
})