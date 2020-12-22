const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 菜单表 */
var dishSchema = new Schema({
  dishName: String, // 菜名
  type: String,  // 菜系
  price: Number,  // 单价
  discount: Number, // 会员折扣(0.1-1)
  imgUrl: String,
  num: {
    type: Number,
    default: 0
  },
  materials: {
    type: Array,
    default: []
  },
})

exports.dish = dishSchema