// router.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('./views/Main.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./views/Settings.vue'),
  },
  {
    path: '/addtoSteam',
    name: 'Add To Steam',
    component: () => import('./views/AddToSteam.vue'),
    props: true
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
