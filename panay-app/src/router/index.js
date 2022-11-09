import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/admin/AdminView.vue'

import Account from '../views/admin/adminpages/Account.vue'
import Branches from '../views/admin/adminpages/Branches.vue'
import Categories from '../views/admin/adminpages/Categories.vue'
import Checks from '../views/admin/adminpages/Checks.vue'
import Dashboard from '../views/admin/adminpages/Dashboard.vue'
import Records from '../views/admin/adminpages/Records.vue'
import Reports from '../views/admin/adminpages/Reports.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/admin',
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: 'account',
          name: 'account',
          component: Account
        },
        {
          path: 'branches',
          name: 'branches',
          component: Branches
        },
        {
          path: 'categories',
          name: 'categories',
          component: Categories
        },
        {
          path: 'checks',
          name: 'checks',
          component: Checks
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'records',
          name: 'records',
          component: Records
        },
        {
          path: 'reports',
          name: 'reports',
          component: Reports
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
