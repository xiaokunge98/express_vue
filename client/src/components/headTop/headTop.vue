<template>
  <div class="header_container" v-if="$route.path !== '/index'">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-if="$route.path === '/home'"
        >/首页</el-breadcrumb-item
      >
      <el-breadcrumb-item v-else :to="{ path: '/home' }"
        >/首页
      </el-breadcrumb-item>
      <el-breadcrumb-item
        :disabled="$route.path === currentPath"
        v-for="(item, index) in $route.meta.info"
        :key="index"
      >
        <!-- {{ item.path === currentPath ? "" : item.name }} -->
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "headTop",
  props: {
    routerPath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentPath: this.routerPath
    };
  },
  created() {
    console.log(this.currentPath);
  }
};
</script>
<style scoped>
.header_container {
  /* background-color: #eff2f7; */
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
