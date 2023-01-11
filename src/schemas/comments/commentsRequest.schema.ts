import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { ICommentsRequestDummy } from '../../interfaces/comments';

export const commentRequestSchema:SchemaOf<ICommentsRequestDummy> = yup.object().shape({
    comment: yup.string().required()
});