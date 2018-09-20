import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home/home';
import today from '@/components/today/index.vue';
import thisMounth from '@/components/thisMounth/index.vue';
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
    }

  ]
});
