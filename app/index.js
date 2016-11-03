import Vue from 'vue';
import Element from 'element-ui';
import entry from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex'
import configRouter from './route.config';
import SideNav from './components/side-nav';
import Css from './assets/styles/common.css';
import bus from './event-bus';
import VueAuth from '@websanova/vue-auth';

Vue.use(VueRouter);
Vue.use(Element);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.interceptors.push((request, next) => {
  bus.$emit('toggleLoading');
  next(() => {
    bus.$emit('toggleLoading');
  })
})

Vue.component('side-nav', SideNav);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: configRouter
});

Vue.use(VueAuth, {
  router: router
});

let app = new Vue({
  afterMounted() {
    console.info('after mounted');
  },
  render: h => h(entry),
  router: router
});

app.$mount('#app');