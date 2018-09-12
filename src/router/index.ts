import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import headComponent from '@/components/headComponent/headComponent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', 
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
    },
    {
      name: '',
      path: '/headComponent',
      component: headComponent,
      meta: {
        title: ''
        // keepAlive: true
      }
    }
  ]
});
