import { registerEnumType } from '@nestjs/graphql';

export enum NoticeGroup {
	FAQ = 'FAQ',
	NOTICE = 'NOTICE'
}
registerEnumType(NoticeGroup, {
	name: 'NoticeGroup',
});

export enum NoticeStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(NoticeStatus, {
	name: 'NoticeStatus',
});
