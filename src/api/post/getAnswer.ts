import api from "../api";
import apiRoutes from "../routes";
import { useNotificationStore } from "../../notification/notificationStore";
import NotificationStatus from "../../notification/NotificationStatus";
import { isOnline } from "../networkMonitor";

const notificationStore = useNotificationStore();


const getAnswer = async (question: string) => {      
  isOnline();
  const response = await fetch(
    `${api}${apiRoutes.chat}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: question }),
    }
  )
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

  return response.response;
}

export default getAnswer;