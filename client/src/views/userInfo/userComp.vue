<template>
  <div class="box">
    <p class="item_p">
      <span>{{ "任务id" }}</span>
      <span>{{ "任务名" }}</span>
      <span> {{ "状态" }}</span>
    </p>
    <p class="item_p" v-for="(item, index) in list" :key="index">
      <span>{{ item.id }}</span> <span>{{ item.task }}</span>
      <span
        :class="['nomar_item', item.complete ? '' : 'danger_item']"
        @click="goDo(item)"
        >{{ item.complete ? "已完成" : "未完成" }}</span
      >
    </p>
    <p class="item_p">
      <span>{{ "任务总量" + list.length }}</span>
      <span>{{ "完成" + overList }}</span>
      <span> {{ "未完成" + noOver }}</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    doList: {
      type: Number
    },
    notList: {
      type: Number
    }
  },
  data() {
    return {
      list: this.dataList,
      overList: this.doList,
      noOver: this.notList
    };
  },
  watch: {
    doList(val) {
      this.overList = val;
    },
    notList(val) {
      this.noOver = val;
    }
  },
  created() {
    console.log(this.noOver);
  },
  methods: {
    goDo(val) {
      this.$emit("do-complte", val.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 400px;
  .item_p {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .nomar_item {
      background: skyblue;
    }
    .danger_item {
      background: red;
    }
  }
}
</style>
