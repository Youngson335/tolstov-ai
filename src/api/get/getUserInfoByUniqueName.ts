import api from "../api"
import apiRoutes from "../routes"
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";
import type { UserInfoModel } from "../../components/User/UserInfoModel";

const notificationStore = useNotificationStore();

const getUserInfoByUniqueName = async (uniqueName: string) => {
    const response = await fetch(`${api}${apiRoutes.user}/${uniqueName}`)
    .then((response) => {
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

export default getUserInfoByUniqueName;