const mongoose = require("mongoose"); //需要npm install mongoose
const config = require("./config/config").db; //获取数据库配置信息
module.exports = mongoose
  .connect(config, {
    useNewUrlParser: true, //警告： pass option { useNewUrlParser: true } to MongoClient.connect
    useUnifiedTopology: true, //警告： pass option { useUnifiedTopology: true } to the MongoClient constructor
  })
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err)); //createConnection方法创建连接实例
