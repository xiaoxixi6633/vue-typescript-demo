import Vue from "vue";
import App from './App.vue';
import store from './store';
import router from './router';
import 'babel-polyfill';
import axios from 'axios';
import net from '@/net/net.ts';
Vue.prototype.$ajax = axios;
axios.defaults.baseURL = net; 
//import { Loading } from 'cube-ui'  
//Vue.use(Loading);
let v = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});


