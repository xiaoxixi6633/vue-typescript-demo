import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home/home';

Vue.use(Router);

export default new Router({
  mode: 'history', 
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: '',
      path: '/home',
      component: home,
      meta: {
        title: '' 
        // keepAlive: true
      }
    }

  ]
});
