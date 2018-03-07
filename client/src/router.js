import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import FindRenting from './views/FindRenting.vue';
import ReviewAppartment from './views/ReviewAppartment.vue';
import AdRenting from './views/AdRenting.vue';
import AdFinding from './views/AdFinding.vue';
import Profile from './views/Profile.vue';
import History from './views/History.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      path: '/findrenting',
      name: 'findrenting',
      component: FindRenting
    },
    {
      path: '/review-appartment',
      name: 'review-appartment',
      component: ReviewAppartment,
      beforeEnter: checkLogin
    },
    {
      path: '/adrenting',
      name: 'adrenting',
      component: AdRenting,
      beforeEnter: checkLogin
    },
    {
      path: '/adfinding',
      name: 'adfinding',
      component: AdFinding,
      beforeEnter: checkLogin
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: checkLogin
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      beforeEnter: checkLogin
    }
  ]
});

function checkLogin(to, from, next) {
  if(localStorage.getItem('user'))
    next();
  else
    next('/login');
}