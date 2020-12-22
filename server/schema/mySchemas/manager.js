const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** boss表 */
var managerSchema = new Schema({
  name: String,   // 用户名
  pwd: {  // 账户密码
    type: String,
    default: 123456
  },
  auth: {
    type: String,
    default: 'boss'
  },  // 权限
  login_time: {  // 上次登录时间
    type: String,
    default: ''
  }
})

exports.manager = managerSchema