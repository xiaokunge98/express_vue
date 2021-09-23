<template>
  <div class="container">
    <head-top :router-path="$route.path"></head-top>
    <div class="container_content">
      <a-button @click="gochuan">调换</a-button>
    </div>
  </div>
</template>
<script>
import headTop from "../components/headTop/headTop.vue";
export default {
  name: "systemManager",
  components: {
    headTop
  },
  data() {
    return {};
  },
  methods: {
    gochuan() {
      // this.$router.push({ name: "用户设置", params: { id: 1, name: "test" } });
      // this.$router.push({ name: "用户设置" });
      this.$router.push({ path: "/userInfo", query: { id: 1, name: "test" } });
    }
  }
};
</script>
