<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
import headTop from "../../components/headTop/headTop.vue";
export default {
  name: "layout",
  components: {
    headTop
  }
};
</script>
