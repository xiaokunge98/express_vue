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
  password: ""
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
  methods: {
    loginSubmit() {
      request
        .post("/api/users/login", this.loginModal)
        .then(res => {
          if (res) {
            //拿到token
            const { token } = res.data;
            //存储token
            sessionStorage.setItem("eleToken", token);
            this.$message.success("登录成功！");
            this.$router.push("/index");
          }
        })
        .catch(err => {
          console.log(err);
        });
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
