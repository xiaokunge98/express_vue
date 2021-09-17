<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">米修在线后台管理系统</span>
      </div>
      <el-form
        :model="loginModal"
        ref="registerRef"
        :rules="rules"
        label-width="100px"
        ><el-row>
          <el-col :span="20">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="loginModal.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="loginModal.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="记住密码">
              <el-checkbox
                v-model="loginModal.rember"
                true-label="T"
                false-label="F"
              ></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-bottom:10px" align="center">
          <el-button @click="loginSubmit" type="primary" size="small"
            >登录</el-button
          >
          <span
            >还没有账号,点击<router-link to="/register">注册</router-link></span
          >
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
import { registerUser } from "../api/user/user.js";
import request from "../request/index";
import axios from "axios";
const registerStruct = {
  email: "",
  password: "",
  rember: "F"
};
export default {
  name: "register",
  data() {
    return {
      loginModal: Object.assign({}, registerStruct),
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度再6到12之间",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确@！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    var vm = this;
    // 在页面加载时从cookie获取登录信息
    let userName = vm.getCookie("userName");
    let userPwd = vm.getCookie("userPwd");

    // 如果存在赋值给表单，并且将记住密码勾选
    if (userName) {
      vm.loginModal.email = userName;
      vm.loginModal.password = userPwd;
      vm.loginModal.rember = "T";
    }
  },

  methods: {
    /**1、登录按钮 */

    loginSubmit() {
      this.$refs.registerRef.validate(valid => {
        if (valid) {
          /**存储到cookie */
          this.setUserInfo();

          request
            .post("/api/users/login", this.loginModal)
            .then(res => {
              if (res) {
                //拿到token
                const { token } = res.data;
                var loginDate = new Date();
                var registerDate = new Date(res.data.userInfo.date);
                var delta = loginDate - registerDate;
                var day = Math.floor(delta / 1000 / 3600 / 24);
                var house = Math.floor((delta / 1000 / 3600) % 24);
                var minute = Math.floor((delta / 1000 / 60) % 60);
                var useTime = day + "天" + house + "小时" + minute + "分钟";
                res.data.userInfo.date = useTime;
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                this.$store.dispatch(
                  "SET_MOUTATIONUSERINFO",
                  res.data.userInfo
                );
                //存储token
                sessionStorage.setItem("eleToken", token);
                this.$message.success("登录成功！");
                this.$router.push("/index");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: "请按要求填写邮箱和密码！"
          });
        }
      });
    },
    /**记住密码*/
    setUserInfo() {
      var vm = this;
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.loginModal.rember == "T") {
        vm.setCookie("userName", this.loginModal.email);
        vm.setCookie("userPwd", this.loginModal.password);
        vm.setCookie("checked", this.loginModal.rember);
      } else {
        vm.setCookie("userName", "");
        vm.setCookie("userPwd", "");
      }
    },
    // 获取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          // indexOf("查找的字符串",查找开始位置)默认开始位置为0
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          // unescape返回一个对escape() 编码的字符串进行解码。不过后期提倡使用decodeURIComponent解释
          // substring（开始位置，结束位置）返回一个截取的字符串
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    // 保存cookie（保存字段cName，字段值value，过期天数expiredays）
    setCookie(cName, value, expiredays) {
      var exdate = new Date();
      // 设置当前月的某一天setDate
      // getDate() 方法可返回月份的某一天
      exdate.setDate(exdate.getDate() + expiredays);
      // encodeURIComponent为转义特殊字符串
      // decodeURIComponent为解析特殊字符串
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    }
  }
};
</script>
<style scope>
.register {
  /* 注意webp类型的图片会报错 */
  background-image: url("../assets/login.jpg");
  background-color: burlywood;
  height: 100%;
  position: relative;
}
.form_container .el-form {
  width: 30%;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background-color: aqua;
  position: absolute;
}
.el-form .el-row:nth-child(1) {
  margin-top: 20px;
}
.manage_tip {
}
.manage_tip .title {
  display: block;
  text-align: center;
  width: 165px;
  margin: auto;
  color: white;
  padding-top: 100px;
}
</style>
