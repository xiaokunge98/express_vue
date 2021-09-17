<template>
  <div class="container">
    <div class="content_box">
      <div class="search_box">
        <el-input></el-input>
        <el-button>搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/headTop/headTop.vue";
export default {
  name: "cargoInfo",
  components: {
    headTop
  },
  created() {
    console.log("及拿来了");
  }
};
</script>
