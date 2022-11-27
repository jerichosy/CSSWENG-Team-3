import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/admin/AdminView.vue'
import Account from '../views/admin/adminpages/Account.vue'
import Branches from '../views/admin/adminpages/Branches.vue'
import Categories from '../views/admin/adminpages/Categories.vue'
import Cheques from '../views/admin/adminpages/Cheques.vue'
import Dashboard from '../views/admin/adminpages/Dashboard.vue'
import Records from '../views/admin/adminpages/records/Records.vue'
import Reports from '../views/admin/adminpages/Reports.vue'
import Sales from '../views/admin/adminpages/records/SalesView.vue'
import Expenses from '../views/admin/adminpages/records/ExpensesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: { name: 'admin' }
    },
    {
      path: '/admin',
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
          path: 'cheques',
          name: 'cheques',
          component: Cheques
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'records',
          name: 'records',
          component: Records,
          children: [
            {
              path: '',
              redirect: { name: 'sales' }
            },
            {
              path: 'sales',
              name: 'sales',
              component: Sales
            },
            {
              path: 'expenses',
              name: 'expenses',
              component: Expenses
            }
          ]
        },
        {
          path: 'reports',
          name: 'reports',
          component: Reports
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // For testing HTTP Requests, delete in prod
    {
      path: "/users",
      alias: "/users",
      name: "users",
      component: () => import('../components/UserList.vue')
    }
  ]
})

export default router
