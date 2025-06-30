import { defineStore } from "pinia";
import NotificationStatus from "./NotificationStatus";

interface NotificationState {
    notification: Notification
}

interface Notification {
    text: string | null;
    status: NotificationStatus | null
}

const useNotificationStore = defineStore('notification', {
    state: (): NotificationState => ({
        notification: {
            text: null,
            status: null,
        },
    }),
    actions: {
        setNotification(response: string, status: NotificationStatus) {
            this.notification!.status = status;
            this.notification!.text = response;
        },
        clearNotification() {
            this.notification.status = null;
            this.notification.text = null;
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