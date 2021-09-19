<template>
  <div class="container">
    <head-top :router-path="$route.path"></head-top>
  </div>
</template>
<script>
import headTop from "../../components/headTop/headTop.vue";
export default {
  name: "cargoInfo",
  components: {
    headTop
  },
  created() {}
};
</script>
