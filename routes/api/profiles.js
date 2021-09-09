//登录或注册
const { request } = require("express");
const express = require("express");
const router = express.Router();
const Profile = require("../../moudles/Profile");
const passport = require("passport");
//登录
//$route    GET api/profile/test
//$desc     返回请求的json数据
//$access   public
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

//登录
//$route    GET api/profile/test
//$desc     创建信息接口
//$access   private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.descript) profileFields.descript = req.body.descript;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    new Profile(profileFields).save().then((profile) => {
      res.json(profile);
    });
  }
);

//获取所有信息
//$route    GET api/profile
//$desc     返回请求的json数据
//$access   public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("没有任何数据！");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//修改信息
//$route    GET api/profile/:id
//$desc     返回请求的json数据
//$access   public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("没有该条数据！");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//修改
//$route    GET api/profile/edit/:id
//$desc     创建信息接口
//$access   private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.descript) profileFields.descript = req.body.descript;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    ).then((profile) => res.json(profile));
  }
);

//删除
//$route    GET api/profile/delete/:id
//$desc     创建信息接口
//$access   private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ _id: req.params.id })
      .then((profile) => {
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json("删除失败！"));
  }
);
module.exports = router;
