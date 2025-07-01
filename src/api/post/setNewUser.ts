import api from "../api";
import apiRoutes from "../routes";
import type { UserInfoModel } from "../../components/User/UserInfoModel";
import type UserInfo from "../../components/User/UserInfo";
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";

const notificationStore = useNotificationStore();

const setNewUser = async (userInfo: UserInfo) => {
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
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {      
        return data;
      })
      .catch((err) => {
        console.error("Ошибка запроса:", err);
        notificationStore.setNotification(`${err}`, 'Ошибка', NotificationStatus.ERROR);
        throw err;
      });

  return response as UserInfoModel;
}

export default setNewUser;