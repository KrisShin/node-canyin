import request from './axios'
/** api 后端接口 */

// 员工登录
export const postLogin = (data) => {
  return request({
    url: '/employee_login',
    method: 'post',
    data
  })
}
// 获取员工
export const getEmployee = (data) => {
  return request({
    url: '/employee_get',
    method: 'post',
    data
  })
}
// 添加员工
export const addEmployee = (data) => {
  return request({
    url: '/employee_add',
    method: 'post',
    data
  })
}
// 删除员工
export const deleteEmployee = (data) => {
  return request({
    url: '/employee_delete',
    method: 'post',
    data
  })
}
// 编辑员工
export const editEmployee = (data) => {
  return request({
    url: '/employee_edit',
    method: 'post',
    data
  })
}

// 获取用户
export const getUser = (data) => {
  return request({
    url: '/user_get',
    method: 'post',
    data
  })
}
// 编辑用户
export const editUser = (data) => {
  return request({
    url: '/user_edit',
    method: 'post',
    data
  })
}
// 删除用户
export const deleteUser = (data) => {
  return request({
    url: '/user_delete',
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
// 编辑菜品
export const editDish = (data) => {
  return request({
    url: '/dish_edit',
    method: 'post',
    data
  })
}
// 添加菜品
export const addDish = (data) => {
  return request({
    url: '/dish_addItem',
    method: 'post',
    data
  })
}
// 删除菜品
export const deleteDish = (data) => {
  return request({
    url: '/dish_delete',
    method: 'post',
    data
  })
}


// 获取采购列表
export const getMaterialList = (data) => {
  return request({
    url: '/material_list',
    method: 'post',
    data
  })
}

export const getMaterialDayList = (data) => {
  return request({
    url: '/material_daylList',
    method: 'post',
    data
  })
}

// 添加原料
export const addMaterialList = (data) => {
  return request({
    url: '/material_add',
    method: 'post',
    data
  })
}

// 编辑原料
export const editMaterial = (data) => {
  return request({
    url: '/material_edit',
    method: 'post',
    data
  })
}

// 删除原料
export const deleteMaterial = (data) => {
  return request({
    url: '/material_delete',
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
// 订单筛选
export const orderSort = (data) => {
  return request({
    url: '/user_order_sort',
    method: 'post',
    data
  })
}

// 订单审核
/** _id status */
export const orderJudge = (data) => {
  return request({
    url: '/user_order_judge',
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

/**销售统计 */
// 获取统计列表
export const getCaculate= (data) => {
  return request({
    url: '/dish_caculate',
    method: 'post',
    data
  })
}
// 统计筛选
export const getCaculateSort= (data) => {
  return request({
    url: '/dish_caculate_sort',
    method: 'post',
    data
  })
}

// 获得某天销量
export const getDaySell= (data) => {
  return request({
    url: '/dish_day_sell',
    method: 'post',
    data
  })
}

// 获得某月销量
export const getMonthSell= (data) => {
  return request({
    url: '/dish_month_sell',
    method: 'post',
    data
  })
}

export const editSingleHeadImg= (data) => {
  return request({
    url: '/img_upload',
    method: 'post',
    data
  })
}
//