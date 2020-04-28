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
import Todos from '../components/Todos.vue';

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
    },
    {
      path: '/todo',
      name: 'Todos',
      component: Todos,
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
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
