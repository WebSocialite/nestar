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
import { Notice, Notices } from '../../libs/dto/cs/notice';
import { NoticeInput, NoticesInquiry } from '../../libs/dto/cs/notice.input';
import { NoticeUpdate } from '../../libs/dto/cs/notice.update';

@Resolver()
export class NoticeResolver {
    constructor(private readonly noticeService: NoticeService) {}

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    public async createNoticeByAdmin(
        @Args('input') input: NoticeInput, 
        @AuthMember("_id") memberId: ObjectId   // memberni ID sini qabul qilamiz
    ): Promise<Notice> {
        // console.log("Mutation: createNotice");
        // console.log("Before transformation:", input.noticeRefId);
        // input.noticeRefId = shapeIntoMongoObjectId(input.noticeRefId);
        // console.log("After transformation:", input.noticeRefId);
        return await this.noticeService.createNoticeByAdmin(memberId, input);
    }

//     @Roles(MemberType.ADMIN)
//     @UseGuards(AuthGuard)
//     @Mutation((returns) => Notice)
//     public async updateNoticeByAdmin(
//         @Args('input') input: NoticeUpdate,
//         @AuthMember('_id') memberId: ObjectId,
//     ) :Promise<Notice> {
//         console.log("Mutation: updateNotice");
//         input._id = shapeIntoMongoObjectId(input._id);
//         return await this.noticeService.updateNoticeByAdmin(input);
//     }

//     @Roles(MemberType.ADMIN)
//     @UseGuards(RolesGuard)
//     @Mutation((returns) => Notice)
//     public async removeNoticeByAdmin(
//         @Args('noticeId') input: string,
//     ): Promise<Notice> {
//         console.log("Query: removeNoticeByAdmin");
//         const noticeId = shapeIntoMongoObjectId(input);
//         return await this.noticeService.removeNoticeByAdmin(noticeId);
//    }


//    @UseGuards(WithoutGuard)
//    @Query((returns) => Notices)
//    public async getNotices(
//        @Args('input') input: NoticesInquiry,
//        @AuthMember('_id') memberId: ObjectId,
//    ) :Promise<Notices> {
//        console.log("Query: getNotices");
//        input.search.noticeRefId = shapeIntoMongoObjectId(input.search.noticeRefId);
//        return await this.noticeService.getNotices(memberId, input);
//    }


}
