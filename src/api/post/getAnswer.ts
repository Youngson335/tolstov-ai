import api from "../api";
import routes from "../routes";
import { useNotificationStore } from "../../notification/notification";
import NotificationStatus from "../../notification/NotificationStatus";
import { NetworkMonitor } from "../networkMonitor";

const notificationStore = useNotificationStore();
const networkMonitor = NetworkMonitor.getInstance();
let _count_error: number = 0;

networkMonitor.startMonitoring();

networkMonitor.onWeakConnection((event) => {
  notificationStore.setNotification(event.detail.message, NotificationStatus.WARNING)
  _count_error++;  
});

networkMonitor.onConnectionRestored((event) => {
  if(_count_error > 0) {    
    _count_error = 0;
    notificationStore.setNotification(event.detail.message, NotificationStatus.SUCCESS)
    setTimeout(() => {
      notificationStore.clearNotification();
    }, 2000);
  }
});

const getAnswer = async (question: string) => {    
  if (!navigator.onLine) {
    console.warn('Отсутствует интернет-соединение');
    throw new Error('Отсутствует интернет-соединение');
  }

  const response = await fetch(
    `${api}${routes.chat}`,
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
      console.log("Успешный ответ:", data);
      return data;
    })
    .catch((err) => {
      console.error("Ошибка запроса:", err);
      notificationStore.setNotification(`${err}`, NotificationStatus.ERROR);
      throw err;
    });

  return response.response;
}

export default getAnswer;