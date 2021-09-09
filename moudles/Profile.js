const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  descript: {
    type: String,
  },
  income: {
    //收入
    type: String,
    required: true,
  },
  expend: {
    //支出
    type: String,
    required: true,
  },
  cash: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
