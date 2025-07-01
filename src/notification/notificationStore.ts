import { defineStore } from "pinia";
import NotificationStatus from "./NotificationStatus";

interface NotificationState {
    notification: Notification
}

interface Notification {
    text: string | null;
    status: NotificationStatus | null,
    title: string | null
}

const useNotificationStore = defineStore('notification', {
    state: (): NotificationState => ({
        notification: {
            text: null,
            status: null,
            title: null,
        },
    }),
    actions: {
        setNotification(response: string, title: string = 'Уведомление', status: NotificationStatus) {
            this.notification!.status = status;
            this.notification!.text = response;
            this.notification.title = title;
        },
        clearNotification() {
            this.notification.status = null;
            this.notification.text = null;
            this.notification.title = null;
        },
        startTimeoutNotification(ms: number) {
            setTimeout(() => {
                this.clearNotification();
            }, ms ?? 2000)
        }        
    },
    getters: {
        getNotification(state) {
            return state.notification;
        }
    }
})

export type { Notification }
export { useNotificationStore }