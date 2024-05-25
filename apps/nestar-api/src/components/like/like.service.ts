import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Like, MeLiked } from '../../libs/dto/like/like';
import { InjectModel } from '@nestjs/mongoose';
import { LikeInput } from '../../libs/dto/like/like.input';
import { Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel('Like') private readonly likeyModel: Model<Like>, 
) {}
//**     this toggle logic adds one like and removes the like when pressed in the second time **/
    public async toggleLike(input: LikeInput): Promise<number> {
        const search: T = { memberId: input.memberId, likeRefId: input.likeRefId},
        exist = await this.likeyModel.findOne(search).exec();
        let modifier = 1;

        if(exist) {
            await this.likeyModel.findOneAndDelete(search).exec();
            modifier = -1;
        } else {
            try {
                await this.likeyModel.create(input);
            } catch(err) {
                console.log("Error, Service.model:", err.message);
                throw new BadRequestException(Message.CREATE_FAILED);
            }
        }
        console.log(`- Like modifier: ${modifier} - `);
        return modifier;
    }

    public async checkLikeExistence(input: LikeInput): Promise<MeLiked[]> {
        const { memberId, likeRefId } = input;
        const result = await this.likeyModel.findOne({ memberId: memberId, likeRefId: likeRefId }).exec();
        return result ? [{ memberId: memberId, likeRefId: likeRefId, myFavorite: true }] : [];
    }

}
