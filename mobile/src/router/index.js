import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/user/order',
    name: 'UserOrder',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/UserOrderPage.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/Cart.vue')
  },
  
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/Detail.vue')
  },
  {
    path: '/dishList/:type?',
    name: 'DishList',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/pages/DishList.vue'),
  }
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
// const router = new VueRouter({
//   mode: 'hash',
//   routes
// })

export default router


