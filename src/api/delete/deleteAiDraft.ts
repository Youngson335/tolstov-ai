import api from "../api";
import apiRoutes from "../apiRoutes";
import type { UserInfoModel } from "../../components/User/UserInfoModel";
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";
import { NotificationScoped } from "../../notification/notificationStore";
import type { ResponseError } from "../ResponseError";

const notificationStore = useNotificationStore();

const deleteAiDraft = async (draftId: number, uniqueName: string, ) => {    
    let response_err: null | ResponseError = null;
    const response = await fetch(`${api}${apiRoutes.ai}/${uniqueName}${apiRoutes.aiDraft}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({draftId: draftId}),
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

export default deleteAiDraft;