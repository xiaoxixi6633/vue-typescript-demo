import Vue from 'vue';
import Router from 'vue-router';
//const home = () => import('@/components/home/home');
//import home from '@/components/home/home';
//import today from '@/components/today/index.vue';
//const today = () => import('@/components/today/index.vue');
//import thisMounth from '@/components/thisMounth/index.vue';
//const thisMounth = () => import('@/components/thisMounth/index.vue');

//import cityList from '@/components/cityList/index.vue';
//const cityList = () => import('@/components/cityList/index.vue');
//import cityListPrice from '@/components/cityListPrice/index.vue';
//const cityListPrice = () => import('@/components/cityListPrice/index.vue');
//import cityListTime from '@/components/cityListTime/index.vue';
//const cityListTime = () => import('@/components/cityListTime/index.vue');

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
      component: resolve => require(['@/components/home/home.vue'], resolve),
      children:[
        {
          path: '/today',
          component: resolve => require(['@/components/today/index.vue'], resolve),
        },
        {
          path: '/thisMounth',
          component:  resolve => require(['@/components/thisMounth/index.vue'], resolve),
        }
      ],
      meta: {
        title: ''
      }
    },
    {
      path: '/cityList',
      component: resolve => require(['@/components/cityList/index.vue'], resolve),
      children:[
        {
          path: '/cityList/price',
          component: resolve => require(['@/components/cityListPrice/index.vue'], resolve),
        },
        {
          path: '/cityList/time',
          component: resolve => require(['@/components/cityListTime/index.vue'], resolve),
        },
      ]
    },

  ]
});
