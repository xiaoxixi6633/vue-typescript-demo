import Vue from "vue";
import App from './App.vue';
import router from './router';
import 'babel-polyfill';
let v = new Vue({
    el: "#app",
    router,
    template: '<App/>',
    components: { App },
});


