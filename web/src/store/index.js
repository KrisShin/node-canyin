import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logState: false || Boolean(JSON.parse(sessionStorage.getItem('user'))),
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    cart: JSON.parse(localStorage.getItem('cart')) || [
      // {
      //   dishName: '牛肉',
      //   type: 'chuan',
      //   price: 39.80,
      //   discount: 0.9,
      //   num: 2,  // 数量
      // }
    ],
  },
  mutations: {
    changeVip(state, v) {
      state.user.isVip = v
      sessionStorage.setItem('user', JSON.stringify(state.user))
    },
    userSignin(state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      Object.assign(state.user, user)
      state.logState = true
    },
    userSignout(state) {
      sessionStorage.removeItem('user')
      localStorage.clear()
      state.logState = false
      Object.keys(state.user).forEach(k => Vue.delete(state.user, k))
    },

    addToCart(state, item) {
      console.log('add: ', item)
      // 如果有则数量加1 没有则添加
      const id = item._id
      let isExist = false
      console.log('添加前', state.cart)
      if(!state.cart.length) {  // 购物车为空
        item.num = 1
        state.cart.push(item)
      } else {
        state.cart.forEach(item => {  // 存在商品
          if(item._id === id) {
            isExist = true
            item.num++
            return false
          }
        }) 
        if(!isExist) {  // 不存在
          item.num = 1
          state.cart.push(item)
        }
      }
      console.log('添加后', state.cart)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    subToCart(state, item) {
      console.log('sub: ', item)
      const id = item._id
      state.cart.forEach((item, index) => {  // 存在商品
        if(item._id === id) {
          if(item.num > 1) {
            item.num--
          } else {
            state.cart.splice(index, 1)
          }
          return false
        }
      }) 
      console.log('减少后', state.cart)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      localStorage.removeItem('cart')
    }
  },
  actions: {
  },
  modules: {
  }
})
