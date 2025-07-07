import { defineStore } from "pinia";
import { useUserInfoStore } from "./userInfoStore";

const userInfoStore = useUserInfoStore();

const useStatisticsStore = defineStore('statistics', {
    state: () => ({
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
    }),
    actions: {
        initStatistics() {            
            this.userVisits.value = userInfoStore.countVisits;
            this.userCountSentMessages.value = userInfoStore.countSentMessages;
        }
    }
})

export default useStatisticsStore;