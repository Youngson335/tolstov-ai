import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Типизация маршрутов
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./Views/HomeView.vue'),
    children: [
      {
        path: '/info',
        name: 'info',
        component: () => import('./Views/home_children/InfoView.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('./Views/home_children/SettingsView.vue'),            
        children: [
          {
            path: '/settings/ai',
            name: 'ai-settings',
            component: () => import('./Views/home_children/settings_children/AiSettingsView.vue'),            
          },
          {
            path: '/settings/user',
            name: 'user-settings',
            component: () => import('./Views/home_children/settings_children/UserSettingsView.vue'),            
          }
        ]
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('./Views/home_children/StatisticsView.vue')
      },
    ]
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
    path: '/:pathMatch(.*)*', 
    redirect: '/welcome' 
  }
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

  const uniqueName = localStorage.getItem('uniqueName');
  const isProtectedRoute = to.path === '/' || to.path.startsWith('/info') || to.path.startsWith('/settings') || to.path.startsWith('/statistics');

  if (isProtectedRoute && !uniqueName) {    
    next('/welcome');
    return;
  }

  next();
});
export default router;