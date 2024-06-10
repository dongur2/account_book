import { createRouter, createWebHistory } from 'vue-router';

/* 컴포넌트 import 추가 */
import Home from '@/pages/Home.vue';
import NotFound from '@/pages/NotFound.vue';
import Calendar from '@/pages/Calendar.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    /* 여기에 route 추가 */
    { path: '/calendar', component: Calendar },
    { path: '/:paths(.*)*', component: NotFound },
  ],
});

export default router;
