import api from "../api";
import apiRoutes from "../routes";
import type { UserInfoModel } from "../../components/User/UserInfoModel";
import type UserInfo from "../../components/User/UserInfo";
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";
import { NotificationScoped } from "../../notification/notificationStore";
import type { ResponseError } from "../ResponseError";

const notificationStore = useNotificationStore();

const setNewUser = async (userInfo: UserInfo) => {
    let response_err: null | ResponseError = null;
    const response = await fetch(`${api}${apiRoutes.user}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            userName: userInfo.userName,
            userSurName: userInfo.userSurName,
            userFamilyName: userInfo.userFamilyName,
            uniqueName: userInfo.uniqueName
         }),
    }).then(async (response) => {
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
        notificationStore.setNotification(response_err!.error, '', NotificationStatus.ERROR, NotificationScoped.AUTH)
        throw err;
      });      

  return response as UserInfoModel;
}

export default setNewUser;