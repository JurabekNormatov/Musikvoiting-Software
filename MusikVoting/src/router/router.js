import Gast from '@/views/Gast.vue';
import GastAnmeldung from '@/views/GastAnmeldung.vue';
import Gastgeber from '@/views/Gastgeber.vue';
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
  {
    path: '/anmelden',
    name: 'GastAnmeldung',
    component: GastAnmeldung,
  },
  {
    path: '/voting',
    name: 'VotingPage',
    component: VotingPage,
  },
  {
    path: '/lieder',
    name: 'Liederlist',
    component: Liederlist,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;