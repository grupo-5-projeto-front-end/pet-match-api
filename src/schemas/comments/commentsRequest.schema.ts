import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ICommentsRequest } from '../../interfaces/comments'

export const commentRequestSchema:SchemaOf<ICommentsRequest> = yup.object().shape({
    comment: yup.string().required()
})