import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.scss'
import App from './App.vue'
import router from '.';
import { useAiModelConfigStore } from './store/aiModelConfigStore';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).mount('#app')

useAiModelConfigStore().initAiModelMode();