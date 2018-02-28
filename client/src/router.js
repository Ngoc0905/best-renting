import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import FindRenting from './views/FindRenting.vue';
import ReviewAppartment from './views/ReviewAppartment.vue';
import AdRenting from './views/AdRenting.vue';
import AdFinding from './views/AdFinding.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/findrenting/:lat?/:lng?',
      name: 'findrenting',
      component: FindRenting
    },
    {
      path: '/review-appartment',
      name: 'review-appartment',
      component: ReviewAppartment,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('user'))
          next();
        else
          next('/login');
      }
    },
    {
      path: '/adrenting',
      name: 'adrenting',
      component: AdRenting
    },
    {
      path: '/adfinding',
      name: 'adfinding',
      component: AdFinding
    }
  ]
});