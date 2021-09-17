<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    var userInfo = localStorage.getItem("userInfo");
    this.$store.dispatch("SET_MOUTATIONUSERINFO", JSON.parse(userInfo));
  }
};
</script>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
