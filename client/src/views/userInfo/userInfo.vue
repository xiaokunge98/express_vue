<template>
  <div class="container">
    <div class="container_hrader">
      <head-top></head-top>
    </div>
    <div class="container_content">
      {{ $route.query.id }}
      {{ $route.query.name }}
    </div>
  </div>
</template>
<script>
import headTop from "../../components/headTop/headTop.vue";
export default {
  name: "userInfo",
  components: {
    headTop
  },
  data() {
    return {
      count: 1
    };
  }
};
</script>
