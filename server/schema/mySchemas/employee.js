const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 员工表  employee manager boss*/
var employeeSchema = new Schema({  
  nickName: String,   // 用户名
  pwd: {  // 账户密码
    type: String,
    default: 123456
  },
  auth: {  // manager employee boss
    type: String,
    default: 'employee'
  },  // 权限
  login_time: {  // 上次登录时间
    type: String,
    default: ''
  }
})

exports.employee = employeeSchema

