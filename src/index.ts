import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Типизация маршрутов
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./Views/HomeView.vue'),
  },  
  {
    path: '/chat',
    name: 'chat',
    component: () => import('./Views/ChatView.vue'),
  },  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router