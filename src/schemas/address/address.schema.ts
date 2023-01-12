import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IAddressRequest } from '../../interfaces/address'

export const addressSchema:SchemaOf<IAddressRequest> = yup.object().shape({
    id: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    street: yup.string().required(),
    number: yup.string(),
    zipCode: yup.string().required()
})