import type UserInfo from "./UserInfo";
import type AiDraftSettings from "../Forms/AiDraftSettings";

export interface UserInfoModel extends UserInfo {
    createdAt: Date | null,
    updatedAt: Date | null,
    countVisits: null | number,
    countSentMessages: null | number,
    id: string | null,
    aiDrafts: AiDraftSettings[]
}