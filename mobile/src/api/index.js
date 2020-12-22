import request from './axios'
/** api 后端接口 */

// 用户登录
export const postLogin = (data) => {
  return request({
    url: '/user_login',
    method: 'post',
    data
  })
}

export const changePwd = (data) => {
  return request({
    url: '/user_pwd',
    method: 'post',
    data
  })
}
// 用户注册
export const postRegister = (data) => {
  return request({
    url: '/user_register',
    method: 'post',
    data
  })
}

// 获取菜单列表
export const getDishList = (data) => {
  return request({
    url: '/dish_list',
    method: 'post',
    data
  })
}

// 提交订单
/** userId orderTime numbers dishs */
export const postOrder= (data) => {
  return request({
    url: '/dish_addOrder',
    method: 'post',
    data
  })
}

// 获取用户订单
/** userId  */
export const getUserOrder = (data) => {
  return request({
    url: '/user_order',
    method: 'post',
    data
  })
}

// 取消订单
/** orderId */
export const cancelOrder = (data) => {
  return request({
    url: '/cancel_order',
    method: 'post',
    data
  })
}

// vip 管理 
/**userId isVip*/
export const postVip= (data) => {
  return request({
    url: '/user_vip',
    method: 'post',
    data
  })
}