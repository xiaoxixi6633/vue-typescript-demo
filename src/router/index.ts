import Vue, { AsyncComponent } from 'vue';
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router';
//const home: AsyncComponent = (): any => import('@/views/main.vue');
import home from '@/components/home/home.vue';
import today from '@/components/today/index.vue';
import thisMounth from '@/components/thisMounth/index.vue';
import cityList from '@/components/cityList/index.vue';
import cityListPrice from '@/components/cityListPrice/index.vue';
import cityListTime from '@/components/cityListTime/index.vue';

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
      children:[
        {
          path: '/today',
          component: today,
        },
        {
          path: '/thisMounth',
          component: thisMounth,
        }
      ],
      meta: {
        title: ''
      }
    },
    {
      path: '/cityList',
      component: cityList,
      children:[
        {
          path: '/cityList/price',
          component: cityListPrice,
        },
        {
          path: '/cityList/time',
          component: cityListTime,
        },
      ]
    },

  ]
});
