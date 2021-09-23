const express = require("express");
const router = express.Router();
const Goods = require("../../moudles/Goods");
const passport = require("passport");

/**
 * 1、获取所有的数据
 * 2、接口：/allGoofs
 * 3、get方法不需要参数
 */
router.get(
  "/allGoods",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var list = [];
    Goods.find()
      .then((goods) => {
        if (!goods) {
          res.status(404).json("没有任何数据！");
        }
        var goodItem = {};
        for (let i = 0; i < goods.length; i++) {
          goodItem = {};
          goodItem.id = goods[i]._id;
          goodItem.goodName = goods[i].goodName;
          goodItem.goodPrice = goods[i].goodPrice;
          goodItem.goodNum = goods[i].goodNum;
          goodItem.goodAddress = goods[i].goodAddress;
          list.push(goodItem);
        }
        res.json(list);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);
/**
 * 1、获取查找的数据
 * 2、接口：/allGoofs
 * 3、get方法不需要参数
 */
router.get(
  "/findGoods",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var list = [];
    Goods.findOne()
      .then((goods) => {})
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);
/**
 * 1、新增goods
 * 2、接口：add
 * 3、方法post，需要请求参数
 */
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Goods.findOne({ goodName: req.body.goodName })
      .then((good) => {
        if (good) {
          res.status(404).json("存储库中已有该商品，不能重复添加！");
        } else {
          const newGood = new Goods({
            goodName: req.body.goodName,
            goodNum: req.body.goodNum,
            goodPrice: req.body.goodPrice,
            goodAddress: req.body.goodAddress,
          });
          newGood
            .save()
            .then((user) => res.json("success"))
            .catch((err) => res.status.json(err));
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);
/**
 * 1、修改goods
 * 2、接口：/update
 * 3、方法post，需要请求参数
 */
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Goods.findOne({ _id: req.body.id })
      .then((good) => {
        if (good) {
          // const updateGood = new Goods({
          //   goodName: req.body.goodName,
          //   goodNum: req.body.goodNum,
          //   goodPrice: req.body.goodPrice,
          //   goodAddress: req.body.goodAddress,
          //   createTime: good.createTime,
          // });
          Goods.updateOne(good, req.body, (err, good) => {
            if (err) {
              res.status(404).json(err);
            } else {
              res.json("success");
            }
          });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);
/**
 * 1、删除
 * 2、接口：delete
 * 3、方法post，需要请求参数
 */
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Goods.findOneAndRemove({ _id: req.params.id }, (err, succ) => {
      if (succ) {
        res.json(succ);
      } else {
        res.status(404).json(err);
      }
    }).catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
