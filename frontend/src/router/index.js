import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contatos',
      name: 'contatos',
      component: () => import('../views/ContatosView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const userTipo = localStorage.getItem('userTipo');
        if (token && userTipo === 'admin') {
          next(); // Permite a entrada na página Admin
        } else {
          next('/login'); // Redireciona para a página de login se não for admin
        }
      }
    },
    {
      path: '/admin/users',
      name: 'users',
      component: () => import('../views/UserView.vue'),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const userTipo = localStorage.getItem('userTipo');
        if (token && userTipo === 'admin') {
          next(); // Permite a entrada na página Admin
        } else {
          next('/login'); // Redireciona para a página de login se não for admin
        }
      }
    },
    {
      path: '/admin/books',
      name: 'books',
      component: () => import('../views/BooksView.vue'),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const userTipo = localStorage.getItem('userTipo');
        if (token && userTipo === 'admin') {
          next();
        } else {
          next('/login'); 
        }
      }
    },
    {
      path: '/admin/books/add',
      name: 'booksadd',
      component: () => import('../views/AddBookView.vue'),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const userTipo = localStorage.getItem('userTipo');
        if (token && userTipo === 'admin') {
          next();
        } else {
          next('/login');
        }
      },
    },
  ],
})

export default router