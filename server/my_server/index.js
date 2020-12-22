/** 
 * 代理服务器 
 * 
 * */
const mongoose = require('mongoose')

const db = require('../mongodb/connect.js')  // 导入db
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body');
db.connect()  // 执行连接数据库操作

// 引入数据表
const schema = require('../schema/index.js')
const User = mongoose.model('users', schema.User)
const Order = mongoose.model('orders', schema.Order)
const Manager = mongoose.model('managers', schema.Manager)
const Employee = mongoose.model('employees', schema.Employee)
const Dish = mongoose.model('dishs', schema.Dish)
const Account = mongoose.model('accounts', schema.Account)
const Material = mongoose.model('materials', schema.Material)
const koa = require('koa')
const router = require('koa-router')() // 路由中间件
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const app = new koa()

app.use(cors())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 600 * 1024 * 1024    // 设置上传文件大小最大限制
  }
}))
app.use(bodyParser())  // 注册 bodyParser

app.use(router.routes())  // 注册 router


/**
 * 引入自定义工具函数
 */
const cipher = require('../utils').cipher
const key = Buffer.from('9vApxLk5G3PAsJrL', 'utf8');
const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');
// let afterEnCode = cipher.enCode(secret, key, iv) 
// console.log(afterEnCode, '加密后')
// let afterDeCode = cipher.deCode(afterEnCode, key, iv)
// console.log(afterDeCode, '解密后')

/** log method url */
app.use(async (ctx, next) => {
  console.log(`method: ${ctx.request.method}_${ctx.request.url}`)
  console.log('收到的参数:', ctx.request.body)
  await next()
})

app.listen(3600, () => {
  console.log('port 3600 is running')
})



/**vip管理 */
router.post('/user_vip', async (ctx, next) => {
  const { isVip, userId } = ctx.request.body
  await User.updateOne({ _id: userId }, { isVip }, (err, res) => {
    if (err) {
      throw err
    } else if (isVip) {
      ctx.response.body = {
        success: true,
        msg: '已成功开通vip'
      }
    } else {
      ctx.response.body = {
        success: true,
        msg: 'vip已取消'
      }
    }

  })
})

/**获取用户列表 */
router.post('/user_get', async (ctx, next) => {
  await User.find({}, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      res
    }
  })
})
/**删除用户 */
router.post('/user_delete', async (ctx, next) => {
  const { _id } = ctx.request.body
  await User.deleteOne({ _id }, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      msg: '删除成功'
    }
  })
})
/**编辑用户 */
router.post('/user_edit', async (ctx, next) => {
  const { _id, nickName, pwd, name, isVip } = ctx.request.body
  let pwd_code = cipher.enCode(pwd, key, iv)
  await User.updateOne({ _id }, { nickName, pwd: pwd_code, name, isVip }, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      msg: '操作成功'
    }
  })
})
/**获取员工/管理员列表 */
router.post('/employee_get', async (ctx, next) => {
  const { type } = ctx.request.body
  await Employee.find({ auth: type }, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      res
    }
  })
})
/**编辑员工 */
router.post('/employee_edit', async (ctx, next) => {
  const { _id, nickName, pwd, auth } = ctx.request.body
  await Employee.updateOne({ _id }, { nickName, pwd, auth }, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      msg: '操作成功'
    }
  })
})
/**删除员工 */
router.post('/employee_delete', async (ctx, next) => {
  const { _id } = ctx.request.body
  await Employee.deleteOne({ _id }, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      msg: '删除成功'
    }
  })
})
/**添加员工 */
router.post('/employee_add', async (ctx, next) => {
  const { nickName, pwd, auth } = ctx.request.body
  // 从数据库中查询用户信息
  await Employee.insertMany({ nickName, pwd, auth }, (err, res) => {
    if (err) {
      throw err
    }
  })
  ctx.response.body = {
    success: true,
    msg: '添加成功'
  }
})
/**员工登录 */
router.post('/employee_login', async (ctx, next) => {
  const { nickName, pwd } = ctx.request.body
  // 从数据库中查询用户信息
  await Employee.find({ nickName, pwd }, (err, res) => {
    if (err) throw err
    if (res.length > 0) {  // 登录成功
      // 更新登陆时间
      let login_time = new Date().toLocaleString('chinese', { hour12: false })
      Employee.updateOne({ nickName }, { login_time }, (err, res) => {
        if (err) throw err
      })
      // 返回
      ctx.response.body = {
        success: true,
        result: {
          msg: '登陆成功!!',
          res
        }
      }
    } else {
      ctx.response.body = {
        success: false,
        result: {
          msg: '用户名或密码错误',
        }
      }
    }
  })
})
/**用户登录 */
router.post('/user_login', async (ctx, next) => {
  const { nickName, pwd } = ctx.request.body
  let pwd_code = cipher.enCode(pwd, key, iv)
  // 从数据库中查询用户信息
  await User.find({ nickName, pwd: pwd_code }, (err, res) => {
    if (err) throw err
    if (res.length > 0) {  // 登录成功
      // 更新登陆时间
      let login_time = new Date().toLocaleString('chinese', { hour12: false })
      User.updateOne({ nickName }, { login_time }, (err, res) => {
        if (err) throw err
      })
      // 返回
      ctx.response.body = {
        success: true,
        result: {
          msg: '登陆成功!!',
          res
        }
      }
    } else {
      ctx.response.body = {
        success: false,
        result: {
          msg: '用户名或密码错误',
        }
      }
    }
  })
})

/**修改密码 */
router.post('/user_pwd', async (ctx, next) => {
  const { _id, opwd, npwd } = ctx.request.body

  let pwd_code = cipher.enCode(opwd, key, iv) // 编码原密码
  // 从数据库中查询用户信息
  let err, user = await User.findOne({ _id, pwd: pwd_code })
  if (!user) {
    ctx.response.body = {
      success: false,
    }
    return
  }
  let npwd_code = cipher.enCode(npwd, key, iv)
  await User.updateOne({ _id }, { pwd: npwd_code }, (err, res) => {
    if (err) {
      throw err
    } else {
      console.log('success')
      ctx.response.body = {
        success: true,
        msg: '修改成功'
      }
    }
  })
})

/**用户注册 */
router.post('/user_register', async (ctx, next) => {
  const { name, nickName, pwd, tel } = ctx.request.body
  // 检测用户昵称是否已经存在
  await User.findOne({ nickName }, (err, res) => {  // res为null没有找到
    if (err) throw err
    if (!res) {
      // 用户密码加密存入数据库
      let pwd_code = cipher.enCode(pwd, key, iv)
      User.insertMany({ name, nickName, tel, pwd: pwd_code }, (err, res) => {
        if (err) throw err
      })
      ctx.response.body = {
        success: true,
        msg: '注册成功'
      }
    } else {
      ctx.response.body = {
        success: false,
        msg: '用户名已经存在'
      }
    }
  })
})

/**获取菜单列表 */
router.post('/dish_list', async (ctx, next) => {
  let query = {}
  const { type, dishName } = ctx.request.body
  if (type !== 'all') {
    query.type = type
  }
  if (dishName) {
    query.dishName = dishName
  }
  await Dish.find(query, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        res
      }
    }
  })
})

/**编辑菜品*/
router.post('/dish_edit', async (ctx, next) => {
  let { _id, type, dishName, price, discount, materials } = ctx.request.body
  let sql = {}
  sql.type = type
  sql.dishName = dishName
  sql.price = price
  sql.discount = discount
  sql.materials = materials
  const file = ctx.request.files.file
  if (file) {
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, './public/upload/') + `/${file.name}`;
    sql.imgUrl = filePath
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
  }
  materials = materials.split(',')
  await Dish.updateOne({ _id }, sql, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        msg: '修改成功'
      }
    }
  })
})

/**添加菜品 */
router.post('/dish_addItem', async (ctx, next) => {
  let { type, dishName, price, discount, materials, } = ctx.request.body
  const file = ctx.request.files.file // 获取上传文件
  let imgUrl = null
  if (file) {
    const reader = fs.createReadStream(file.path)
    let filePath = path.join(__dirname, './public/upload/') + `/${file.name}`
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    imgUrl = filePath
  }

  //console.log(type, dishName, price, discount, materials)
  materials = materials.split(',')
  await Dish.findOne({ dishName }, (err, res) => {  // res为null没有找到
    if (err) throw err
    if (!res) {
      Dish.insertMany({ type, dishName, price, discount, materials, imgUrl }, (err, res) => {
        if (err) throw err
      })
      ctx.response.body = {
        success: true,
        msg: '添加成功'
      }
    } else {
      ctx.response.body = {
        success: false,
        msg: '该菜品已存在'
      }
    }
  })
})

/**删除菜品 */
router.post('/dish_delete', async (ctx, next) => {
  const { _id } = ctx.request.body
  await Dish.deleteOne({ _id }, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        msg: '删除成功',
      }
    }
  })
})


// 添加订单
router.post('/dish_addOrder', async (ctx, next) => {
  let { userId, orderTime, dishs, numbers, cost } = ctx.request.body
  const myDishs = JSON.parse(dishs)
  orderTime = new Date(orderTime).toLocaleString('chinese', { hour12: false })
  let dishNames = ''  // 所有菜名
  myDishs.forEach(item => {
    dishNames += item.dishName + ','
  })
  dishNames = dishNames.slice(0, -1)
  // 查询当前时间段已定桌位
  let orderedTable = []
  let err, Ordered = await (await Order.find({ orderTime, status: { $in: [1, 2] } }))// 当前时间段是否有预定
  for (let order of Ordered) {
    orderedTable.push(...order.table)// 查询出所有已预订的桌子
  }

  let avilableTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  for (i of orderedTable) {
    avilableTable.splice(avilableTable.indexOf(i), 1)
  }
  let needTable = Math.ceil(numbers / 4)  // 4 单张桌位容纳人数
  if (avilableTable.length < needTable) {  // 桌位不够
    ctx.response.body = {
      success: false,
      msg: `该时间段的用餐桌位不足,目前空闲${avilableTable.length}张餐桌,最多可容纳${avilableTable.length * 4}人`
    }
  } else { // 桌位充足
    let table = []
    // 桌号分配
    for (let i = 0; i < needTable; i++) {
      table.push(avilableTable[i])
    }
    console.log('分配桌号', table)
    //往订单中加入用户信息
    await User.find({ _id: userId }, { userName: 1, nickName: 1, tel: 1, isVip: 1 }, (err, res) => {
      if (err) throw err
      const { userName, nickName, tel, isVip } = res[0]
      Order.insertMany({ userId, userName, nickName, tel, isVip, orderTime, dishs, dishNames, numbers, cost, table }, (err, res) => {
        if (err) {
          throw err
        } else {
          // console.log(res)
        }
      })
      ctx.response.body = {
        success: true,
        msg: '预定成功!'
      }
    })
  }
})



// 获取用户订单
router.post('/user_order', async (ctx, next) => {
  let query = {}  // 查询语句
  const { userId, nickName, status } = ctx.request.body
  if (status) {
    query.status = status
  }
  if (userId) {
    query.userId = userId
  }
  if (nickName) {
    query.nickName = nickName
  }
  let res = await Order.find(query).sort({ createTime: -1 })
  await Order.find(query, (err) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      res
    }
  })
})

// 用户取消订单
router.post('/cancel_order', async (ctx, next) => {
  const { _id } = ctx.request.body
  const operateTime = new Date().toLocaleString('chinese', { hour12: false })
  if (_id) {
    await Order.updateOne({ _id }, { status: 3, operateTime }, (err, res) => {
      if (err) {
        throw err
      } else {
        ctx.response.body = {
          success: true,
          msg: '审核成功'
        }
      }
    })
  }
})

router.post('/user_order_sort', async (ctx, next) => {
  let query = {}  // 查询语句
  const { nickName, status, start, end } = ctx.request.body
  if (status) {
    query.status = status
  }
  if (nickName) {
    query.nickName = nickName
  }
  await Order.find(query, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      res
    }
  })
})


// 订单审核 1待确认 2已完成 3已取消
router.post('/user_order_judge', async (ctx, next) => {
  const { status, _id } = ctx.request.body
  const operateTime = new Date().toLocaleString('chinese', { hour12: false })
  if (status && _id) {
    await Order.updateOne({ _id }, { status, operateTime }, (err, res) => {
      if (err) {
        throw err
      } else {
        ctx.response.body = {
          success: true,
          msg: '审核成功'
        }
      }
    })
    Order.find({ _id }, (err, res) => {
      if (err) throw err
      let { dishs } = res[0]
      dishs = JSON.parse(dishs)
      dishs.forEach(item => {
        const { type, dishName, _id, num, price } = item
        const pay = Number((num * price).toFixed(2))
        if (status === '2') {
          // 添加到统计表
          Account.updateOne(
            { dishName },
            { type, dishName, $inc: { sellCount: num, sellMoney: pay } },
            { upsert: true },
            (err, res) => {
              if (err) throw err
            })
        } else if (status === '3') {
          // 从统计表减去
          Account.findOne({ dishName }, (err, res) => {
            if (res.sellCount === num) {
              console.log('delele:', res.dishName)
              Account.deleteOne({ dishName: res.dishName }, (err, res) => {
                if (err) throw err
              })
            } else {
              Account.updateOne(
                { dishName },
                { type, dishName, $inc: { sellCount: 0 - num, sellMoney: 0 - pay } },
                { upsert: true },
                (err, res) => {
                  if (err) throw err
                })
            }
          })
        }
      })
    })
  }
})

/**获取采购列表 */
router.post('/material_list', async (ctx, next) => {
  await Material.find({}, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        res
      }
    }
  })
})

// 日采购量统计
router.post('/material_daylList', async (ctx, next) => {
  const { date } = ctx.request.body
  let time = RegExp(new Date(date).toLocaleDateString('chinese', { hour12: false }))
  await Material.find({ buyTime: time }, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        res
      }
    }
  })
})

/**添加原料 */
router.post('/material_add', async (ctx, next) => {
  const { name, number, price, operator } = ctx.request.body
  const total = (number * price).toFixed(2)
  let date = new Date()
  // let timeStr = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ', ' + date.getHours() + ":" + date.getMinutes() + ':' + date.getSeconds()
  let timeStr = date.toLocaleString('chinese', { hour12: false })
  await Material.insertMany({ name, number, price, total, operator, operateTime: timeStr, buyTime: timeStr }, (err, res) => {
    if (err) {
      throw err
    }
  })
  ctx.response.body = {
    success: true,
    msg: '添加成功'
  }
})

/**删除原料 */
router.post('/material_delete', async (ctx, next) => {
  const { _id } = ctx.request.body
  await Material.deleteOne({ _id }, (err, res) => {
    if (err) throw err
    ctx.response.body = {
      success: true,
      msg: '删除成功'
    }
  })
})

/**编辑原料 */
router.post('/material_edit', async (ctx, next) => {
  const { _id, name, number, price, operator } = ctx.request.body
  const total = (number * price).toFixed(2)
  let date = new Date()
  // let operateTime = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ', ' + date.getHours() + ":" + date.getMinutes() + ':' + date.getSeconds()
  let operateTime = date.toLocaleString('chinese', { hour12: false })
  await Material.updateOne({ _id }, { name, number, price, total, operator, operateTime }, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        msg: '修改成功'
      }
    }
  })
})


/**销售统计
 * sellCount 或 sellMoney
 */
router.post('/dish_caculate', async (ctx, next) => {
  await Account.find({}, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        res
      }
    }
  })
})

// 日订单销量
router.post('/dish_day_sell', async (ctx, next) => {
  let day = new Date(ctx.request.body.day).toLocaleDateString('chinese', { hour12: false })
  console.log('查询日销量: ', day)
  let dishes = {}
  let date = new RegExp(day)
  let orders = await Order.find({ createTime: date, status: 2 }) // 查询某天的所有订单
  if (orders.length === 0) {
    ctx.response.body = {
      success: false,
    }
    return
  }
  for (let ord of orders) {
    let dishs = JSON.parse(ord.dishs[0])
    for (let d of dishs) {
      if (!dishes.hasOwnProperty(d.dishName)) {
        dishes[d.dishName] = 0
      }
      dishes[d.dishName] += d.num + 0
    }
  }
  let accounts = []
  for (let name in dishes) {
    dish = await Dish.findOne({ dishName: name })
    accounts.push({
      type: dish.type,
      dishName: name,
      sellCount: dishes[name],
      sellMoney: dish.price * dishes[name]
    })
  }
  ctx.response.body = {
    success: true,
    accounts
  }
})

// 月订单销量
router.post('/dish_month_sell', async (ctx, next) => {
  let month = new Date(ctx.request.body.month).toLocaleDateString('chinese', { hour12: false })
  console.log('查询月销量: ', month)
  let dishes = {}
  let reg = month.split('-')
  reg[2] = ''
  let date = new RegExp(reg.join('-'))
  let orders = await Order.find({ createTime: date, status: 2 }) // 查询某天的所有订单
  if (orders.length === 0) {
    ctx.response.body = {
      success: false,
    }
    return
  }
  for (let ord of orders) {
    let dishs = JSON.parse(ord.dishs[0])
    for (let d of dishs) {
      if (!dishes.hasOwnProperty(d.dishName)) {
        dishes[d.dishName] = 0
      }
      dishes[d.dishName] += d.num + 0
    }
  }
  let accounts = []
  for (let name in dishes) {
    dish = await Dish.findOne({ dishName: name })
    accounts.push({
      type: dish.type,
      dishName: name,
      sellCount: dishes[name],
      sellMoney: dish.price * dishes[name]
    })
  }
  ctx.response.body = {
    success: true,
    accounts
  }
})

router.post('/dish_caculate_sort', async (ctx, next) => {
  const { dishName, type } = ctx.request.body
  let query = {}
  if (dishName) {
    query.dishName = dishName
  }
  if (type) {
    query.type = type
  }
  await Account.find(query, (err, res) => {
    if (err) {
      throw err
    } else {
      ctx.response.body = {
        success: true,
        res
      }
    }

  })
})




