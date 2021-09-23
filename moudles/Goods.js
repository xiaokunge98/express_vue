const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
  goodName: {
    type: String,
  },
  goodPrice: {
    type: Number,
  },
  goodNum: {
    type: Number,
  },
  goodAddress: {
    type: String,
  },
  // 新增时间
  createTime: {
    type: Date,
    default: Date.now,
  },
  // 新增时间
  updateTime: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Goods = mongoose.model("goods", GoodsSchema);
