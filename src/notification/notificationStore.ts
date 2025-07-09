import { defineStore } from "pinia";
import NotificationStatus from "./NotificationStatus";

interface NotificationState {
    notification: Notification
}

interface Notification {
    text: string | null;
    status: NotificationStatus | null,
    title: string | null,
    scope: NotificationScoped | null
}

export enum NotificationScoped {
    AUTH = 'auth',
    CHAT = 'chat',
    WELCOME = 'welcome',
    HOME = 'home'
}

const useNotificationStore = defineStore('notification', {
    state: (): NotificationState => ({
        notification: {
            text: null,
            status: null,
            title: null,
            scope: null,
        },
    }),
    actions: {
        setNotification(response: string, title: string = 'Уведомление', status: NotificationStatus, scope?: NotificationScoped) {
            this.notification!.status = status;
            this.notification!.text = response;
            this.notification.title = title;
            scope ? this.notification.scope = scope : this.notification.scope = null;
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