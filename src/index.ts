import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueNProgress from './components/Loaders/VueNProgress'

VueNProgress;

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
        // children: [
        //   {
        //     path: '/settings/ai',
        //     name: 'ai-settings',
        //     component: () => import('./Views/home_children/settings_children/AiSettingsView.vue'),            
        //   },
        //   {
        //     path: '/settings/user',
        //     name: 'user-settings',
        //     component: () => import('./Views/home_children/settings_children/UserSettingsView.vue'),            
        //   }
        // ]
      },
      // {
      //   path: '/statistics',
      //   name: 'statistics',
      //   component: () => import('./Views/home_children/StatisticsView.vue')
      // },
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

router.afterEach(() => {
  NProgress.done()
})
export default router;