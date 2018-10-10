import Vue from "vue";
import App from './App.vue';
import store from './store';
import router from './router';
import 'babel-polyfill';
import axios from 'axios';
import net from '@/net/net.ts';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL = net; 

let v = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});


