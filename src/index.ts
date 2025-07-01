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
    path: '/welcome',
    name: 'welcome',
    component: () => import('./Views/WelcomeView.vue'),
  },  
  {
    path: '/chat',
    name: 'chat',
    component: () => import('./Views/ChatView.vue'),
  },  
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./Views/SettingsView.vue'),
  },    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  
  const storedCount = localStorage.getItem('count-visits');
  let countVisits = storedCount ? JSON.parse(storedCount) : 0;

  countVisits++;
  localStorage.setItem('count-visits', JSON.stringify(countVisits));

  if (countVisits === 1 && to.path !== '/welcome') {
    next('/welcome');
    return;
  }

  next();
});
export default router;