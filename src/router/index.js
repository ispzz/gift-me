import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Wishlist from '../views/Wishlist.vue'
import New from '../views/New.vue';
import Show from '../views/Show.vue';
import Edit from '../views/Edit.vue';
import ShareView from '../views/ShareView.vue';

Vue.use(Router)

  const routes = [
    // {
    //   path: '*', // redirects bad urls back to login
    //   redirect: '/login'
    // },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/share-view/:id',
      name: 'ShareView',
      component: ShareView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wishlist/new',
      name: 'new-item',
      component: New,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wishlist/:id',
      name: 'show',
      component: Show,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wishlist/:id/edit',
      name: 'edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('wishlist');
  else next();
});

export default router;
