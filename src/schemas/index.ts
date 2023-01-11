import { addressSchema } from "./address/address.schema";
import { userRequestSchema } from "./users/userRequest.schema";
import { userUpdateRequestSchema } from "./users/userUpdateResquest.schema";
import { updateUserResponseSchema } from "./users/userUpdateResponse.schema";
import { loginSchema } from "./users/userLogin.schema";
import { petRequestSchema } from "./pets/petRequest.schema";
import { petResponseSchema } from "./pets/petResponse.schema";
import { likeRequestSchema } from "./likes/likesRequest.schema";
import { likeResponseSchema } from "./likes/likesResponse.schema";
import { commentRequestSchema } from "./comments/commentsRequest.schema";
import { commentResponseSchema } from "./comments/commentsResponse.schema";
import { userResponseSchema, userArraySchema } from "./users/userResponse.schema";

export {
    addressSchema,
    userRequestSchema,
    userResponseSchema,
    userArraySchema,
    loginSchema,
    updateUserResponseSchema,
    userUpdateRequestSchema,
    petRequestSchema,
    petResponseSchema,
    likeRequestSchema,
    likeResponseSchema,
    commentRequestSchema,
    commentResponseSchema
}