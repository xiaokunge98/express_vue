<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">测试系统登录</span>
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
import request from "../request/index";
import { setCookie, getCookie } from "../util/storage/storage";
const registerStruct = {
  email: "",
  password: "",
  rember: "F"
};
export default {
  name: "logint",
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
    let userName = getCookie("userName");
    let userPwd = getCookie("userPwd");
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
      if (this.loginModal.rember == "T") {
        setCookie("userName", this.loginModal.email);
        setCookie("userPwd", this.loginModal.password);
        setCookie("checked", this.loginModal.rember);
      } else {
        setCookie("userName", "");
        setCookie("userPwd", "");
      }
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
