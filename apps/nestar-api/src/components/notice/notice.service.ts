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
import { Notice } from '../../libs/dto/cs/notice';
import { NoticeCategory } from '../../libs/enums/notice.enum';
import { NoticeInput } from '../../libs/dto/cs/notice.input';

@Injectable()
export class NoticeService {
    constructor(@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
    private memberService: MemberService,
    private propertyService: PropertyService,
    private boardArticleService: BoardArticleService,
) {}

public async createNoticeByAdmin(input: NoticeInput): Promise<Notice> {
    try {
        const result = await this.noticeModel.create(input);
        // increase memberProperties +1
        await this.memberService.memberStatsEditor({ 
            _id: result.memberId, 
            targetKey: 'memberNotices', 
            modifier: 1,
        })
        return result;
    } catch (err) {
        console.log("Error, Service.model:", err.message);
        throw new BadRequestException(Message.CREATE_FAILED);
    }
}
//     public async updateComment (memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
//         const { _id } = input;
    
//         const result = await this.commentModel
//         .findOneAndUpdate({ _id: _id, memberId: memberId, commentStatus: CommentStatus.ACTIVE }, input, {
//             new: true,
//         },).exec();
//         if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
//             return result;
//         }


//     public async getComments(memberId: ObjectId, input: CommentsInquiry): Promise<Comments> {
//         const { commentRefId } = input.search;
//         const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
//         const sort: T = { [input?.sort ?? 'createdAt' ]: input?.direction ?? Direction.DESC };

//         const result: Comments[] = await this.commentModel
//         .aggregate([
//             { $match: match },
//             { $sort: sort },
//             { $facet: {
//                 list: [{ $skip: (input.page -1) * input.limit}, { $limit: input.limit },
//                     lookupMember,
//                     { $unwind: '$memberData' },
//                 ],
//                 metaCounter: [{ $count: "total" }],
//              }, 
//             },
//         ]).exec();
//         if(!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
//         return result[0];
//     }

//     public async removeCommentByAdmin (input: ObjectId): Promise<Comment> {
//         const result = await this.commentModel.findByIdAndDelete(input).exec();
//         if(!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
//         return result;
// }
}
