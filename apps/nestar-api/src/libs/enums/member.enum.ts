import { registerEnumType } from "@nestjs/graphql";

export enum MemberType {
    USER = "USER",
    AGENT = "AGENT",
    ADMIN = "ADMIN",
}
registerEnumType(MemberType, { 
    name: "MemberType",
});

export enum MemberStatus {
    ACTIVE = "ACTIVE",
    DELETE = "DELETE",
    BLOCK = "BLOCK",
}
registerEnumType(MemberStatus, { 
    name: "MemberStatus",
});

export enum MemberAuthType {
    PHONE = "PHONE",
    EMAIL = "EMAIL",
    TELEGRAM = "TELEGRAM",
}
registerEnumType(MemberAuthType, { 
    name: "MemberAuthType",
});