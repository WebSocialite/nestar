import { Module } from '@nestjs/common';
import { BoardArticleResolver } from './board-article.resolver';
import { BoardArticleService } from './board-article.service';
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { ViewModule } from '../view/view.module';
import { LikeModule } from '../like/like.module';
import { NotificationModule } from '../notification/notification.module';
import MemberSchema from '../../schemas/Member.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BoardArticle',  // chech whether it starts with Captal letter
        schema: BoardArticleSchema,
      },
    ]),
    MongooseModule.forFeature([
			{
				name: 'Member',
				schema: MemberSchema,
			},
		]),
    AuthModule,
    MemberModule,  // we will use statistic update method
    ViewModule,   
    LikeModule, 
    NotificationModule,
  ],
  providers: [BoardArticleResolver, BoardArticleService],
  exports: [BoardArticleService],
})
export class BoardArticleModule {}
