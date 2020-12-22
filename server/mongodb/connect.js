/** 引入 */
const mongoose = require('mongoose')

// 连接数据库
const connectDB = () => {
  const db_url = "mongodb://127.0.0.1:27017/restaurant"
  mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  var db = mongoose.connection;

  // 测试是否连接上
  db.on('error', console.error.bind(console, 'mongodb connection error:'));

  db.once('open', function() {
    console.log("mongodb connection success！")
  });
}


exports.connect = connectDB
