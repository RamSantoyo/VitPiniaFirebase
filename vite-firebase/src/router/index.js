import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import {userStore} from '../store/user.js';

const rutaprotegida = async(to, from, next) => {
  const userstor = userStore();
  userstor.session = true;
  const user = await userstor.detectUser();
  if (user) {
    next();
  } else {
    next('/login');
  }userstor.session = false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/', 
      name: 'home',
      component: HomeView, beforeEnter: rutaprotegida
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
