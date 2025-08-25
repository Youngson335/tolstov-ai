import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.scss'
import App from './App.vue'
import router from './index';
import { useAiModelConfigStore } from './store/aiModelConfigStore';

const app = createApp(App);
const pinia = createPinia();

//отсутствует база данных, убираем возможность регестрироваться
localStorage.clear();

app.use(pinia)
   .use(router)   
   .mount('#app')
   .$nextTick(() => {
     useAiModelConfigStore().initAiModelMode();
   }); 