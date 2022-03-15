
import Vue from 'vue';
import Router from 'vue-router';

import About from '../view/about'
import Other from '../view/other'
import Login from '../view/login'
import Home from '../view/home'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/other', component: Other },
    { path: '/about', component: About },
  ]
})


export default  router;
  