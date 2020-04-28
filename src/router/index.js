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

Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   linkActiveClass: 'active',
//   routes: [
//     {
//       path: '*', // redirects bad urls back to login
//       redirect: '/login'
//     },
//     {
//       path: '/',
//       redirect: '/login'
//     },
//     {
//       path: '/home',
//       name: 'Home',
//       component: Home,
//       meta: {
//         requiresAuth: true
//       }
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/sign-up',
//       name: 'SignUp',
//       component: SignUp
//     }
//   ]
// });

  const routes = [
    {
      path: '*', // redirects bad urls back to login
      redirect: '/login'
    },
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
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist
    },
    {
      path: '/wishlist/new',
      name: 'new-words',
      component: New
    },
    {
      path: '/wishlist/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/wishlist/:id/edit',
      name: 'edit',
      component: Edit
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
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
