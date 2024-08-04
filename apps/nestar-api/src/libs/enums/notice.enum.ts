import { registerEnumType } from '@nestjs/graphql';

// export enum NoticeCategory {
// 	FAQ = 'FAQ',
// 	TERMS = 'TERMS',
// 	INQUIRY = 'INQUIRY',
// }
// registerEnumType(NoticeCategory, {
// 	name: 'NoticeCategory',
// });

export enum NoticeStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(NoticeStatus, {
	name: 'NoticeStatus',
});
