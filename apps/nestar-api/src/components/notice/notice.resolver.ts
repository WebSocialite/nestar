import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Comments, Comment } from '../../libs/dto/comment/comment';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Notice } from '../../libs/dto/cs/notice';
import { NoticeInput } from '../../libs/dto/cs/notice.input';

@Resolver()
export class NoticeResolver {
    constructor(private readonly noticeService: NoticeService) {}

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    public async createNoticeByAdmin(
        @Args('input') input: NoticeInput, 
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Notice> {
        console.log("Mutation: createNotice");
        input.memberId = memberId;
        return await this.noticeService.createNoticeByAdmin(input);
    }

//  @UseGuards(AuthGuard)
//     @Mutation((returns) => Comment)
//     public async updateComment(
//         @Args('input') input: CommentUpdate,
//         @AuthMember('_id') memberId: ObjectId,
//     ) :Promise<Comment> {
//         console.log("Mutation: updateComment");
//         input._id = shapeIntoMongoObjectId(input._id);
//         return await this.commentService.updateComment(memberId, input);
//     }

//     @UseGuards(WithoutGuard)
//     @Query((returns) => Comments)
//     public async getComments(
//         @Args('input') input: CommentsInquiry,
//         @AuthMember('_id') memberId: ObjectId,
//     ) :Promise<Comments> {
//         console.log("Query: getComments");
//         input.search.commentRefId = shapeIntoMongoObjectId(input.search.commentRefId);
//         return await this.commentService.getComments(memberId, input);
//     }
   

//     //**      ADMIN        **/

//     @Roles(MemberType.ADMIN)
//     @UseGuards(RolesGuard)
//     @Mutation((returns) => Comment)
//     public async removeCommentByAdmin(
//         @Args('commentId') input: string,
//     ): Promise<Comment> {
//         console.log("Query: removeCommentByAdmin");
//         const commentId = shapeIntoMongoObjectId(input);
//         return await this.commentService.removeCommentByAdmin(commentId);
//    }


}
