<template>
  <div class="container">
    <head-top></head-top>
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
