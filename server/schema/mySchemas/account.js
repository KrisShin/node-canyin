const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 统计表 
 * 确认订单后生成
 * 取消订单后销毁
*/
var accountSchema = new Schema({
  type: '', // 菜系
  dishName: '',  // 菜名
  sellCount: {  // 销售数量
    type: Number,
    default: 0
  },
  sellMoney: {  // 销售额
    type: Number,
    default: 0
  },
})

exports.account = accountSchema