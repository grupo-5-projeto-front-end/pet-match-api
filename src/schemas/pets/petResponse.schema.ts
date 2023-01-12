import exp from 'constants'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IPetResponse } from '../../interfaces/pets'
import { userResponseSchema } from '../users/userResponse.schema'

export const petResponseSchema:SchemaOf<any> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    sex: yup.string().required(),
    category: yup.string().required(),
    breed: yup.string().required(),
    age: yup.string().required(),
    bio: yup.string().required(),
    avatar: yup.string(),
    isActive: yup.boolean().required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required()
})
export const userPetsResponseSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    avatar: yup.string().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    pets: yup.array(petResponseSchema)
})