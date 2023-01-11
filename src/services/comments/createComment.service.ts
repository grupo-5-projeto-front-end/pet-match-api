import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/commentsEntity";
import { Users } from "../../entities/usersEntity";
import { ICommentsRequest } from "../../interfaces/comments";

export const createCommentService = async (body: ICommentsRequest, targetId: string, commenterId: string) => {
    body.userId = commenterId;
    console.log(body)
    
    const userRepo = AppDataSource.getRepository(Users);
    const commentRepo = AppDataSource.getRepository(Comments);

    const fullComment = commentRepo.create(body);
    console.log(fullComment)
    const createdComment = await commentRepo.save(fullComment);

    const user: any = await userRepo.findOne({
        where: {
            id: targetId
        },
        relations: {
            comments: true
        }
    });
    user.comments = [...user.comments, createdComment];
    await userRepo.save(user)

    const returnComment: any = fullComment
    returnComment.userId = commenterId

    // const validateResponse = await commentResponseSchema.validate(fullComment, {stripUnknown: true});

    return returnComment
}