//登录或注册
const { request } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../../moudles/Users");
const bcrypt = require("bcrypt"); //使用bcrypt进行密码加密
const config = require("../../config/config");
var jwt = require("jsonwebtoken"); //用来生成token
const passport = require("passport");
//登录
//$route    GET api/users/test
//$desc     返回请求的json数据
//$access   public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

//注册
//$route    POST api/users/register
//$desc     返回请求的json数据
//$access   public
router.post("/register", (req, res) => {
  //查询是否存在email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("邮箱已被注册！");
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        identity: req.body.identity,
        password: req.body.password,
      });
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
  // console.log(req.body);
  //post方法需要npm i body-parser，要不然用不了
});
//登录
//$route    POST api/users/login
//$desc     返回token jwt passport
//$access   public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json("用户不存在！");
    }
    //密码匹配，刚刚对密码进行了bcrypt加密,所以要用该工具方法比较
    bcrypt.compare(password, user.password).then((isMatch) => {
      //isMatch密码匹配后返回的Boolean值
      // isMatch === true
      if (isMatch === true) {
        //匹配成功返回的应该是一个token值所以需要npm install jsonwebtoken用来生成配置token
        // jwt.sign("规则","加密名字","过期时间","箭头函数")
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
        };
        jwt.sign(rule, config.sercretOrKey, { expiresIn: 10 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        res.status(404).json("密码错误！");
      }
    });
  });
});

//token验证
//$route    get api/users/current
//$desc     return current user
//$access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      emali: req.user.email,
      identity: req.user.identity,
    });
  }
);
module.exports = router;
