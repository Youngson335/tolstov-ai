import type UserInfo from "./UserInfo";
import type AiDraftSettings from "../Forms/AiDraftSettings";

export interface UserInfoModel extends UserInfo {
    createdAt: Date | null,
    updatedAt: Date | null,
    countVisits: number,
    countSentMessages: number,
    id: string | null,
    aiDrafts: AiDraftSettings[]
}