const mongoose = require('mongoose')

const Schema_user = require('./mySchemas/user.js')  // 引入定义的表结构
const Schema_order = require('./mySchemas/order.js')
const Schema_manager = require('./mySchemas/manager.js')
const Schema_employee = require('./mySchemas/employee.js')
const Schema_dish = require('./mySchemas/dish.js')
const Schema_account = require('./mySchemas/account.js')
const Schema_material = require('./mySchemas/material.js')

const User = mongoose.model('users', Schema_user.user)
const Order = mongoose.model('orders', Schema_order.order)
const Manager = mongoose.model('managers', Schema_manager.manager)
const Employee = mongoose.model('employees', Schema_employee.employee)
const Dish = mongoose.model('dishs', Schema_dish.dish)
const Account = mongoose.model('accounts', Schema_account.account)
const Material = mongoose.model('materials', Schema_material.material)
module.exports = {
  schema: {
    User,
    Order,
    Manager,
    Employee,
    Dish,
    Account,
    Material
  }
}


