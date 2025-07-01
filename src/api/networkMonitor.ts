import { useNotificationStore } from "../notification/notificationStore";
import NotificationStatus from "../notification/NotificationStatus";

const notificationStore = useNotificationStore();
export class NetworkMonitor {
  private static instance: NetworkMonitor;
  private offlineEventName = 'weak-connection';
  private onlineEventName = 'connection-restored';
  private isMonitoring = false;
  private threshold = 10000; // Порог медленного соединения в миллисекундах
  private checkInterval = 6000; // Интервал проверки в миллисекундах
  private timer?: number;  

  private constructor() {
    this.startMonitoring = this.startMonitoring.bind(this);
    this.stopMonitoring = this.stopMonitoring.bind(this);
    this.checkConnectionSpeed = this.checkConnectionSpeed.bind(this);    
  }

  public static getInstance(): NetworkMonitor {
    if (!NetworkMonitor.instance) {
      NetworkMonitor.instance = new NetworkMonitor();
    }
    return NetworkMonitor.instance;
  }

  public startMonitoring() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    
    // Проверяем сразу при старте
    this.checkConnectionSpeed();
    
    // Затем проверяем периодически
    this.timer = setInterval(this.checkConnectionSpeed, this.checkInterval);
    
    // Также отслеживаем онлайн/оффлайн события браузера
    window.addEventListener('online', this.checkConnectionSpeed);
    window.addEventListener('offline', () => {
      this.emitWeakConnection();
    });
  }

  public stopMonitoring() {
    if (!this.isMonitoring) return;
    this.isMonitoring = false;
    
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    window.removeEventListener('online', this.checkConnectionSpeed);
    window.removeEventListener('offline', this.emitWeakConnection);
  }

  private async checkConnectionSpeed() {
    if (!navigator.onLine) {
      this.emitWeakConnection();
      return;
    }

    try {
      const startTime = performance.now();
      const response = await fetch('https://httpbin.org/get', {
        method: 'HEAD',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const endTime = performance.now();
      const latency = endTime - startTime;

      if (latency > this.threshold) {
        this.emitWeakConnection();
      } else {
        this.emitConnectionRestored();
      }
    } catch (error) {
      this.emitWeakConnection();
    }
  }

  private emitWeakConnection() {
    const event = new CustomEvent(this.offlineEventName, {
      detail: { message: 'Слабый интернет или отсутствует соединение' }
    });
    window.dispatchEvent(event);
  }

  private emitConnectionRestored() {
    const event = new CustomEvent(this.onlineEventName, {
      detail: { message: 'Соединение восстановлено' }
    });
    window.dispatchEvent(event);
  }

  public onWeakConnection(callback: (event: CustomEvent) => void) {
    window.addEventListener(this.offlineEventName, callback as EventListener);
  }

  public onConnectionRestored(callback: (event: CustomEvent) => void) {
    window.addEventListener(this.onlineEventName, callback as EventListener);
  }

  public removeListeners() {
    window.removeEventListener(this.offlineEventName, () => {});
    window.removeEventListener(this.onlineEventName, () => {});
  }
}

export const startNetWorkMonitoring = () => {
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
}

export const isOnline = () => {
  if (!navigator.onLine) {
    console.warn('Отсутствует интернет-соединение');    
    throw new Error('Отсутствует интернет-соединение');
  }
}