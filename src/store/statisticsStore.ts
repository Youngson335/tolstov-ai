import { defineStore } from "pinia";
import { useUserInfoStore } from "./userInfoStore";
import getUsersStatistics from "../api/get/getUsersStatistics";
import type { UserStatisticsResponse } from "../api/get/getUsersStatistics";

const userInfoStore = useUserInfoStore();

export interface StatisticsItem {
    title: string;
    value: number;
}
interface StatisticsState {
    userVisits: StatisticsItem,
    userCountSentMessages: StatisticsItem,
    allVisits: StatisticsItem,
    allCountSentMessages: StatisticsItem,    
    uploadFlag: null | 1,
}

export const useStatisticsStore = defineStore('statistics', {
    state: (): StatisticsState => ({
        userVisits: {
            title: 'Кол-во посещений приложения',
            value: 0,
        },
        userCountSentMessages: {
            title: 'Кол-во отправленных сообщений',
            value: 0,
        },
        allVisits: {
            title: 'Столько раз посетили пользователи это приложение',
            value: 0,
        },
        allCountSentMessages: {
            title: "Всего отправлленных сообщений",
            value: 0
        },        
        uploadFlag: null,
    }),
    actions: {
        async initStatistics() {            
            const { all_users, all_sent_messages } = await getUsersStatistics() as UserStatisticsResponse;
            
            this.userVisits.value =  userInfoStore.countVisits;
            this.userCountSentMessages.value = userInfoStore.countSentMessages;
            this.allVisits.value = all_users;
            this.allCountSentMessages.value = all_sent_messages;
            
            this.uploadFlag = 1;
        }
    }
})