import Vue from 'vue';
import Router from 'vue-router';
import Dots from './views/Dots.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dots',
      component: Dots,
    },
    {
      path: '/arc',
      name: 'arc',
      component: () => import('./views/Arc.vue'),
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('./views/Pie.vue'),
    },
  ],
});
