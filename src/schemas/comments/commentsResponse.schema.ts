import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IComments } from '../../interfaces/comments'

export const commentResponseSchema:SchemaOf<IComments> = yup.object().shape({
    comment: yup.string().required(),
    userId: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    deletedAt: yup.date()
})