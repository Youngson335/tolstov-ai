import api from "../api"
import apiRoutes from "../routes"
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";
import { NotificationScoped } from "../../notification/notificationStore";
import type { UserInfoModel } from "../../components/User/UserInfoModel";
import type { ResponseError } from "../ResponseError";

const notificationStore = useNotificationStore();

const incrementMessages = async (uniqueName: string) => {
    let response_err: null | ResponseError = null;
    const response = await fetch(`${api}${apiRoutes.chat}/${uniqueName}${apiRoutes.incrementMessages}`, {
        method: "PATCH",     
         headers: {
          "Content-Type": "application/json",          
        },   
    })
    .then(async (response) => {
        if (!response.ok) {
          response_err = await response.json();
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    .then((data) => {      
        return data;
      })
    .catch((err) => {
        console.error("Ошибка запроса:", err);        
        notificationStore.setNotification(response_err!.error, '', NotificationStatus.ERROR, NotificationScoped.CHAT)
        throw err;
    });

    return response as UserInfoModel;
}

export default incrementMessages;