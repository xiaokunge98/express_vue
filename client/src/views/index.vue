<template>
  <el-container>
    <el-header>
      <div class="logoTitle">
        <img src="../assets/image/logo.jpg" />
        <span>前后端分离项目</span>
      </div>
      <div class="loginUser">
        <h5>{{ $store.state.userInfo.email }}</h5>
      </div>
      <div class="loginOut">
        <el-button @click="loginOut" size="small" type="warning"
          >退出</el-button
        >
      </div>
    </el-header>
    <el-container>
      <el-aside :width="collapseShow ? '64px' : asideWidth + 'px'">
        <div id="close_line" @click="collapseShow = !collapseShow">
          |||
        </div>
        <el-menu
          background-color="grey"
          :router="true"
          :collapse="collapseShow"
          :unique-opened="true"
          active-text-color="yellow"
        >
          <template
            v-for="(oneItem, oneIndex) in $router.options.routes[0].children"
          >
            <el-menu-item
              v-if="!oneItem.children"
              :index="oneItem.path"
              :key="oneIndex"
            >
              <template>
                <i :class="oneItem.meta.icon"></i>
                <span class="white_item">{{ oneItem.name }}</span>
              </template>
            </el-menu-item>

            <el-submenu
              v-else
              class="white_item"
              :index="oneItem.path"
              :key="oneItem.path"
            >
              <template slot="title">
                <i :class="oneItem.meta.icon"></i>
                <span class="white_item">{{ oneItem.name }}</span>
              </template>

              <el-menu-item
                v-for="(item, twoIndex) in oneItem.children"
                :index="item.path"
                :key="twoIndex"
              >
                <template>
                  <i :class="item.meta.icon"></i>
                  <span class="white_item">{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <div v-if="$route.path === '/index'">
          <el-breadcrumb class="header_container">
            <el-breadcrumb-item :to="{ path: '/home' }">{{
              routerName
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <wellcome></wellcome>
        </div>
        <transition v-else mode="out-in">
          <router-view></router-view> </transition
      ></el-main>
    </el-container>
  </el-container>
</template>

<script lang="js">
import {startLoading,endLoading} from '../util/loading.js'
import  wellcome from './home.vue'
export default{
  name:'index',
  data(){
    return {
      asideWidth:150,
      collapseShow:false,
      loading:null,
      routerName:'/根目录'
    }
  },
  components:{
    wellcome
  },
  created(){
  },
  methods:{
    loginOut(){
     this.$confirm('亲，您确定要退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
           const loading= startLoading(this.loading)
           var timer= setTimeout(() => {
              endLoading(loading)
                this.$router.push('/login')
                clearTimeout(timer)
            }, 400);

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '请继续浏览商城'
            });
          });

    }
  }
}
</script>

<style scope>
.header_container {
  /* background-color: #eff2f7; */
  height: 30px;
  display: flex;
  align-items: center;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate(0, 200px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}
.el-container {
  height: 100%;
}
.el-container .el-header {
  width: 100%;
  background-color: grey;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.el-container .el-aside {
  height: 100%;
  background-color: grey;
  transition: 0.5s ease width;
}
.white_item {
  color: white;
}
.el-menu {
  border-right: none;
}
.el-container .el-main {
  height: 100%;
}
.logoTitle {
  height: 60px;
  width: auto;
  display: flex;
  position: absolute;
  align-items: center;
  padding-left: 5px;
}
.logoTitle img {
  margin-right: 15px;
  width: 250px;
  height: 50px;
}
.loginUser {
  height: 60px;
  position: absolute;
  right: 100px;
}
.loginOut {
  height: 60px;
  width: 50px;
  line-height: 60px;
  right: 30px;
  position: absolute;
}
.el-main {
  padding-top: 20px;
}
#close_line {
  cursor: pointer;
  text-align: center;
  letter-spacing: 3px;
  color: white;
}
</style>
