const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 用户表 */
var userSchema = new Schema({
  name: String,   // 用户名
  nickName: {  // 用户昵称 (unique)
    type: String,
    default: ''
  },
  tel: {  // 电话号码
    type: Array,
    default: []
  },
  pwd: {  // 登录密码
    type: String,
    default: 123456
  },
  isVip: {  // 是否会员
    type: Boolean,
    default: false
  },
  reg_time: {  // 注册时间
    type: String,
    default: new Date().toLocaleString('chinese',{hour12:false})
  },
  login_time: {  // 上次登录时间
    type: String,
    default: ''
  }
})

exports.user = userSchema