const express = require("express"); //引入express
const bodyParser = require("body-parser"); //引入可以使用post方法
const passport = require("passport");
const connection = require("./db"); //获取连接实例
const { port } = require("./config/config"); //获取启动参数
const app = express(); //实例化一个入口
//引入users
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

//使用body-parser中间键
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);
//nodemon自动保存不用重启可以使用npm下载安装
// app.get("/", (req, res, next) => {
//   res.send("hello world!");
// });
//使用routers
app.use("/users", users);
app.use("/profiles", profiles);
// const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
