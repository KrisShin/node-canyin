const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 管理员表 */
var managerSchema = new Schema({
  name: '', // 原料名
  number: '', // 数量
  buyTime: '', //采购日期
  operateTime: '', // 操作日期
  price: '', // 单价
  total: '', // 总价
  operator: '', // 操作员工
})

exports.material = managerSchema