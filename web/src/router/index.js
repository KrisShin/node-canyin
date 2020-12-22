import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/orderManage',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/OrderManage.vue')
  },
  {
    path: '/buyManage',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/BuyManage.vue')
  },
  {
    path: '/dishManage',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/DishManage.vue')
  },
  {
    path: '/employeeManage',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/EmployeeManage.vue')
  },
  {
    path: '/userManage',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/UserManage.vue')
  },
  {
    path: '/sellCalculate',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/SellCalculate.vue')
  },
  {
    path: '/sysManage',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/SysManage.vue')
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    const user = sessionStorage.getItem('user')
    if(user) {
      next()
    } else {
      router.push('/')
    }
  } else {
    next()
  }
})

export default router


