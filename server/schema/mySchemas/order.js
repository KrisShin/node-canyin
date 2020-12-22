const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 订单表 */
var orderSchema = new Schema({
  userId: {  // 买家id
    type: String,
    default:''
  },
  userName: {  // 买家姓名
    type: 'String',
    default: ''
  },
  nickName: {  // 买家昵称
    type: String,
    default: ''
  },
  tel: {  // 电话号码
    type: Array,
    default: []
  },
  isVip: {  // 是否会员
    type: Boolean,
    default: false
  },

  operateTime: {  // 员工操作时间 (确认订单是否完成  完成后入账 未完成取消入账)
    type: String,
    default: ''
  },
  status: {  // 订单状态  1待确认 2已完成 3已取消
    type: String,
    default: '1'
  },
  createTime: {  // 下单时间
    type: String,
    default: new Date().toLocaleString('chinese',{hour12:false})
  },
  orderTime: {  // 预定时间
    type: String,
    default: ''
  },
  numbers: {  // 用餐人数
    type: Number,
    default: 0
  },
  table: { // 桌号 根据当天的订单从1到20递增 若大于20则提示饭店已满座 每一个桌号可容纳4人 桌号按照每笔订单人数自动分配
    type: Array,
    default: [1]
  },
  dishNames: String,
  dishs:{  // 已订菜品
    type: Array,
    default: [], 
    /** {
     *    dishName: String, // 菜名
          price: String,  // 单价
          discount: String, // 会员折扣(0.1-1)
          amount: String,  // 数量
        } */
  },
  cost: String,  // 单笔订单交易金额
})

exports.order = orderSchema