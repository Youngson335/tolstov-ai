import type UserInfo from "./UserInfo";

export interface UserInfoModel extends UserInfo {
    createdAt: Date | null,
    updatedAt: Date | null,
    countVisits: null | number,
    countSentMessages: null | number,
    id: string | null,
}