<template>
  <div class="login_container">
    <div class="container">
      <div class="wellcome">
        <div class="pinkbox" ref="pinkboxRef">
          <div class="signup nodisplay" ref="signupRef">
            <h1>欢迎进行注册</h1>
            <el-form
              label-width="0px"
              ref="registerFormRef"
              :rules="registerRules"
              :model="registerModel"
              autocomplete="off"
            >
              <el-form-item prop="name">
                <el-input
                  v-model="registerModel.name"
                  type="text"
                  placeholder="用户名"
                />
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                  v-model="registerModel.email"
                  type="eamil"
                  placeholder="邮箱"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="registerModel.password"
                  type="password"
                  placeholder="密码"
                />
              </el-form-item>
              <el-form-item prop="password2">
                <el-input
                  placeholder="确认密码"
                  v-model="registerModel.password2"
                  type="passrord"
                />
              </el-form-item>
              <el-form-item prop="identity">
                <el-select v-model="registerModel.identity">
                  <el-option label="管理员" value="manager"></el-option>
                  <el-option label="员工" value="employee"></el-option>
                </el-select>
              </el-form-item>
              <el-button @click="goRegister" class="button submit"
                >注册</el-button
              >
            </el-form>
          </div>
          <div class="signin" ref="signinRef">
            <h1>欢迎登录使用</h1>
            <el-form
              label-width="0px"
              :model="loginModal"
              :rules="rules"
              ref="loginFormRef"
              class="more-padding"
              autocomplete="off"
            >
              <el-form-item prop="email">
                <el-input
                  v-model="loginModal.email"
                  type="email"
                  placeholder="邮箱"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginModal.password"
                  type="password"
                  placeholder="密码"
              /></el-form-item>
              <div class="checkbox">
                <input
                  type="checkbox"
                  v-model="loginModal.rember"
                  id="remember"
                /><label for="remember">Remember Me</label>
              </div>
              <el-button class="button submit" @click="goLogin">登录</el-button>
            </el-form>
          </div>
        </div>
        <div class="leftbox">
          <h2 class="title"><span>WELLCOME</span>&<br />HAPPY</h2>
          <p class="desc">pick your perfect <span>bouquet</span></p>
          <img
            src="../../assets/image/login.jpg"
            alt=""
            class="flower smaller"
          />
          <p class="account">Have an accout?</p>
          <el-button class="button" id="signin" @click="goSignin"
            >去登陆</el-button
          >
        </div>
        <div class="rightbox">
          <h2 class="title"><span>WELLCOME</span>&<br />HAPPY</h2>
          <p class="desc">pick your perfect <span>bouquet</span></p>
          <img src="../../assets/login.jpg" alt="" class="flower" />
          <p class="account">Don't have an accout?</p>
          <el-button class="button" id="signup" @click="goSignup">
            去注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../request/index";
import { setCookie, getCookie } from "../../util/storage/storage";
const loginStruct = {
  email: "",
  password: "",
  rember: false
};
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
    return {
      registerModel: Object.assign({}, registerStruct),
      loginModal: Object.assign({}, loginStruct),
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
      },
      registerRules: {
        password2: [
          {
            required: true,
            message: "两次密码不一致！",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请填写姓名！",
            trigger: "blur"
          }
        ],
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
  watch: {},
  created() {
    // 在页面加载时从cookie获取登录信息
    let userName = getCookie("userName");
    let userPwd = getCookie("userPwd");
    // 如果存在赋值给表单，并且将记住密码勾选
    if (userName) {
      this.loginModal.email = userName;
      this.loginModal.password = userPwd;
      this.loginModal.rember = true;
    }
  },
  methods: {
    /**切换为注册表单 */
    goSignin() {
      this.$refs.pinkboxRef.style.transform = "translateX(0%)";
      this.$refs.signupRef.classList.add("nodisplay");
      this.$refs.signinRef.classList.remove("nodisplay");
    },
    /**切换为登录表单 */
    goSignup() {
      console.log("aaa");
      this.$refs.pinkboxRef.style.transform = "translateX(80%)";
      this.$refs.signinRef.classList.add("nodisplay");
      this.$refs.signupRef.classList.remove("nodisplay");
    },
    /**登录 */
    goLogin() {
      this.$refs.loginFormRef.validate(valid => {
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
    /** 记住密码*/
    /**记住密码*/
    setUserInfo() {
      if (this.loginModal.rember == true) {
        setCookie("userName", this.loginModal.email);
        setCookie("userPwd", this.loginModal.password);
        setCookie("checked", this.loginModal.rember);
      } else {
        setCookie("userName", "");
        setCookie("userPwd", "");
      }
    },
    /**注册账号 */
    goRegister() {
      this.$refs.registerFormRef.validate(valied => {
        if (valied) {
          request
            .post("/api/users/register", this.registerModel)
            .then(res => {
              if (res) {
                this.$message.success("注册成功！");
                this.goSignin();
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
<style scoped>
.login_container {
  height: 100%;
  background: rgba(0, 255, 255, 1);
}
/* 容器的样式 */
.container {
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
  /* overflow: hidden; */
}
.gosignup {
  transform: translateX(80%);
}
.gosignin {
  transform: translateX(0%);
}
/* wellcome */
.wellcome {
  background: #f6f6f6;
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, o.1);
}
.pinkbox {
  position: absolute;
  top: -10%;
  left: 5px;
  background: rgba(102, 205, 170, 1);
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  z-index: 2;
}
.nodisplay {
  display: none;
  transition: all 0.5s ease;
}
.leftbox,
.rightbox {
  position: absolute;
  width: 50%;
  transition: all 1s ease;
}
.leftbox {
  left: -2%;
}
.rightbox {
  right: -2%;
}
h1 {
  font-weight: "微软雅黑";
  text-align: center;
  margin-top: 95px;
  text-transform: uppercase;
  color: #f6f6f6;
  font-size: 2em;
  letter-spacing: 8px;
}
.title {
  font-family: "Courier New", Courier, monospace;
  color: blue;
  font-size: 1.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
}
.desc {
  margin-top: -8px;
}
.account {
  margin-top: 45%;
  font-size: 10px;
}
p {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 0.7em;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}
span {
  color: #eac7cc;
}
.flower {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 45%;
  left: 27%;
  opacity: o.8;
}
.smaller {
  width: 120px;
  height: 120px;
  top: 48%;
  left: 30%;
  opacity: 0.9;
}
.el-button {
  padding: 12px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  border-radius: 10px;
  margin: auto;
  outline: none;
  display: block;
}
.el-button:hover {
  background: #eac7cc;
  color: #f6f6f6;
  transition: background-color 1s ease-in-out;
}
.el-button {
  margin-top: 3%;
  background: #f6f6f6;
  color: #ce7d88;
  border: 1px solid #eac7cc;
}
/* 表单样式 */
.el-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7px;
}
.more-padding {
  padding-top: 35px;
}
.more-padding .el-input {
  padding: 0px 12px;
}
.more-padding .submit {
  margin-top: 45px;
}
.submit {
  margin-top: -15px;
  padding: 12px;
  border-color: #ce7d88;
}
.signin {
  margin-top: -10px;
}
.signup {
  margin-top: -10px;
}
.submit:hover {
  background: #cbc0d3;
  border-color: #bfb1c9;
}
.el-input .el-input__inner {
  background: #eac7cc;
  width: 65%;
  color: #ce7d88;
  border: none;
  border-bottom: 1px solid rgba(246, 246, 246, 0.5);
  padding: 9px;
  font-weight: 100;
}
.el-input .el-input__inner::placeholder {
  color: #f6f6f6;
  letter-spacing: 2px;
  font-size: 1em;
  font-weight: 100;
}
.el-input:focus {
  background: #ce7d88;
  color: #ce7d88;
  outline: none;
  border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
}
.el-input:focus::placeholder {
  opacity: 0;
}
label {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: #ce7d88;
  font-size: 0.8em;
  letter-spacing: 1px;
}
.checkbox {
  display: inline;
  white-space: nowrap;
  position: relative;
  left: -52px;
  top: 25px;
}
.el-input[type="checkbox"] {
  width: 20px;
  background: #ce7d88;
}
.checkbox .el-input[type="checkbox"]:checked + label {
  color: #ce7d88;
  transition: all 0.5s ease;
}
</style>
