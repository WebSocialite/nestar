import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PropertyService } from '../property/property.service';
import { BoardArticleService } from '../board-article/board-article.service';
import { MemberService } from '../member/member.service';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { Comments, Comment } from '../../libs/dto/comment/comment';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { T } from '../../libs/types/common';
import { lookupMember } from '../../libs/config';
import { Notice, Notices } from '../../libs/dto/cs/notice';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import { NoticeInput, NoticesInquiry } from '../../libs/dto/cs/notice.input';
import { NoticeUpdate } from '../../libs/dto/cs/notice.update';

@Injectable()
export class NoticeService {
    constructor(@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
    // private memberService: MemberService,
    // private propertyService: PropertyService,
    // private boardArticleService: BoardArticleService,
) {}

public async createNoticeByAdmin(memberId: ObjectId, input: NoticeInput): Promise<Notice> {
   //input.memberId = memberId;
     console.log("Input before saving:", input);
     let result = null;
    try {
        result = await this.noticeModel.create(input); 
        console.log("Created Notice:", result); 
        // await this.memberService.memberStatsEditor({ 
        //     _id: input.noticeRefId, 
        //     targetKey: 'memberNotices', 
        //     modifier: 1,
        // });
    } catch (err) {
        console.log("Error, Service.model:", err.message);
        throw new BadRequestException(Message.CREATE_FAILED);
    }
    if(!result) throw new InternalServerErrorException(Message.CREATE_FAILED);
    return result;
}
//     public async updateNoticeByAdmin (input: NoticeUpdate): Promise<Notice> {
//         const { _id } = input;
    
//         const result = await this.noticeModel
//         .findOneAndUpdate({ _id: _id,  noticeStatus: NoticeStatus.ACTIVE }, input, {
//             new: true,
//         },).exec();
//         if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
//             return result;
//         }

//     public async removeNoticeByAdmin (input: ObjectId): Promise<Notice> {
//         const result = await this.noticeModel.findOneAndDelete(input).exec();
//         if(!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
//         return result;
// }

// public async getNotices(memberId: ObjectId, input: NoticesInquiry): Promise<Notices> {
//     const { noticeRefId } = input.search;
//     const match: T = { noticeRefId: noticeRefId, noticeStatus: NoticeStatus.ACTIVE };
//     const sort: T = { [input?.sort ?? 'createdAt' ]: input?.direction ?? Direction.DESC };

//     const result: Notices[] = await this.noticeModel
//     .aggregate([
//         { $match: match },
//         { $sort: sort },
//         { $facet: {
//             list: [{ $skip: (input.page -1) * input.limit}, { $limit: input.limit },
//                 lookupMember,
//                 { $unwind: '$memberData' },
//             ],
//             metaCounter: [{ $count: "total" }],
//          }, 
//         },
//     ]).exec();
//     if(!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
//     return result[0];
// }



}
