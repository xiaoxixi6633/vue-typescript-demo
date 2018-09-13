import Vue from "vue";
import App from './App.vue';
import store from './store';
import router from './router';
import 'babel-polyfill';
let v = new Vue({
    el: "#app",
    router,
    store,
    template: '<App/>',
    components: { App },
});


