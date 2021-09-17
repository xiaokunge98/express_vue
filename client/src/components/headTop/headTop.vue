<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }"> </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "headTop",
  data() {
    return {};
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
