import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { likesRequst } from '../../interfaces/likes'

export const likeRequestSchema:SchemaOf<likesRequst> = yup.object().shape({
    userId: yup.string(),
    petId: yup.string()
})