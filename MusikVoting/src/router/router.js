import { createRouter, createWebHistory } from 'vue-router'; // Новый API Vue Router
import Gastgeber from '@/views/Gastgeber.vue';
import Gast from '@/views/Gast.vue';
import HomePage from '@/views/HomePage.vue';

const routes = [
    {
    path: '/',
    name: 'HomePage',
    component: HomePage,
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