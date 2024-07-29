import { Module } from '@nestjs/common';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';
import { MongooseModule } from '@nestjs/mongoose';
import NoticeSchema from '../../schemas/Notice.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyModule } from '../property/property.module';
import { BoardArticleModule } from '../board-article/board-article.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Notice', 
        schema: NoticeSchema,
      },
    ]),
     AuthModule,
     MemberModule,
     PropertyModule,
     BoardArticleModule
    ],

  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {}
