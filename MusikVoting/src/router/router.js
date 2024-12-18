import { createRouter, createWebHistory } from 'vue-router'; // Новый API Vue Router
import Gastgeber from '@/views/Gastgeber.vue';
import Gast from '@/views/Gast.vue';

const routes = [
  {
    path: '/',
    redirect: '/gast',
  },
  {
    path: '/gastgeber',
    name: 'Gastgeber',
    component: Gastgeber,
  },
  {
    path: '/gast',
    name: 'Gast',
    component: Gast,
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;