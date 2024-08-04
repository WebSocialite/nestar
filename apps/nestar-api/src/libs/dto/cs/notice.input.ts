import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
//import { NoticeCategory } from '../../enums/notice.enum';
import { Direction } from '../../enums/common.enum';
import { availableNoticeSorts } from '../../config';

@InputType()
export class NoticeInput {
	// @IsNotEmpty()
	// @Field(() => NoticeCategory)
	// noticeCategory: NoticeCategory;

	@IsNotEmpty()
	@Length(1, 100)
	@Field(() => String)
	noticeContent: string;
	
	// @IsNotEmpty()
	// @Field(() => String)
	// noticeRefId: ObjectId;

	memberId?: ObjectId;
}

@InputType()
class NoticeSearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	noticeRefId?: ObjectId;
}

@InputType()
export class NoticesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableNoticeSorts)  // createdAT updatedAT logic
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsOptional()
	@Field(() => NoticeSearch)
	search?: NoticeSearch;
}
