import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.scss'
import App from './App.vue'
import router from './index';
import { useAiModelConfigStore } from './store/aiModelConfigStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
   .use(router)   
   .mount('#app')
   .$nextTick(() => {
     useAiModelConfigStore().initAiModelMode();
   }); 