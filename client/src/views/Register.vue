<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">米修在线后台管理系统</span>
      </div>
      <el-form
        :model="registerModel"
        ref="registerRef"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="20">
            <el-form-item label="姓名" prop="name">
              <el-input type="text" v-model="registerModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerModel.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="registerModel.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="确认密码" prop="password2">
              <el-input
                type="text"
                v-model="registerModel.password2"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="选择身份" prop="identity">
              <el-select v-model="registerModel.identity">
                <el-option label="管理员" value="manager"></el-option>
                <el-option label="员工" value="employee"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="margin-bottom:10px" align="center">
          <el-button @click="registerSubmit" type="primary" size="small"
            >注册</el-button
          >
          <span
            >已有账号，点击
            <router-link to="/login">登录</router-link>
          </span>
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
import request from "../request/index";
const registerStruct = {
  name: "",
  email: "",
  password: "",
  password2: "",
  identity: ""
};
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerModel.password) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      registerModel: Object.assign({}, registerStruct),
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
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
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validate: validatePass2, trigger: "blur" }
        ],
        identity: [{ required: true, message: "请选择身份", trigger: "blur" }]
      }
    };
  },
  methods: {
    registerSubmit() {
      this.$refs.registerRef.validate(valied => {
        if (valied) {
          request
            .post("/api/users/register", this.registerModel)
            .then(res => {
              if (res) {
                this.$message.success("注册成功！");
                this.$router.push("/login");
              }
            })
            .catch(err => console.log(err));
        } else {
          this.$notify.error({
            title: "信息填写错误",
            message: "请按对应要求完成信息填写！"
          });
        }
      });
    }
  }
};
</script>
<style scope>
/* 给route-link 元素添加样式 */
/* .router-link-active {
  font-size: 30px;
  font-weight: 800;
  color: red;
  transform: scale(2);
  transition: 1s all;
} */
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
  margin-top: 10px;
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
