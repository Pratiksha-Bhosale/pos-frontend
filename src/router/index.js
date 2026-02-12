import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path : '/login',
        name : 'login',
        component : Login
    },
    {
  path: '/dashboard',
  component: DashboardLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: '',
      component: Dashboard
    },
    {
      path: 'categories',
      component: () => import('../views/Categories.vue')
    },
    {
      path: 'products',
      component: () => import('../views/Products.vue')
    }
  ]
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router