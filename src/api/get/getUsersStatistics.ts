import api from "../api"
import apiRoutes from "../apiRoutes"
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";
import { NotificationScoped } from "../../notification/notificationStore";
import type { ResponseError } from "../ResponseError";

export interface UserStatisticsResponse {
    all_users: number,
    all_sent_messages: number,
}

const notificationStore = useNotificationStore();

const getUsersStatistics = async () => {  
    let response_err: null | ResponseError = null;
    const response = await fetch(`${api}${apiRoutes.user}${apiRoutes.usersStatistics}`)
    .then(async (response) => {
        if (!response.ok) {
          response_err = await response.json();
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    .then((data: UserStatisticsResponse) => {      
        return data;
      })
    .catch((err) => {
        console.error("Ошибка запроса:", err);        
        notificationStore.setNotification(response_err!.error, '', NotificationStatus.ERROR, NotificationScoped.AUTH)
        throw err;
    });

    return response as UserStatisticsResponse;
}

export default getUsersStatistics;