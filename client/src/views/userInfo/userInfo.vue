<template>
  <div class="container">
    <div class="container_hrader">
      <head-top></head-top>
    </div>
    <div class="container_content">
      <input v-model="taskObj.task" />
      <button @click="doAdd">添加</button>
      <user-comp
        :data-list="list"
        :do-list="doList"
        :not-list="notDolist"
        @do-complte="doThing"
      ></user-comp>
      <p class="item_p">
        <span>{{ "任务总量" + this.list.length }}</span>
        <span>{{ "完成" + doList }}</span>
        <span> {{ "未完成" + notDolist }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/headTop/headTop.vue";
import userComp from "./userComp.vue";
export default {
  name: "userInfo",
  components: {
    headTop,
    userComp
  },
  data() {
    return {
      taskObj: {
        id: 0,
        task: "",
        complete: false
      },
      count: 1,
      list: [{ id: 1, task: "任务一", complete: true }]
    };
  },
  computed: {
    doList() {
      const _list = [];
      this.list.filter(item => {
        if (item.complete) {
          _list.push(item);
        }
      });
      return _list.length;
    },
    notDolist() {
      const _list = [];
      this.list.filter(item => {
        if (!item.complete) {
          _list.push(item);
        }
      });
      return _list.length;
    }
  },
  methods: {
    doAdd() {
      this.taskObj.id = this.list.length;
      const _item = JSON.parse(JSON.stringify(this.taskObj));
      this.list.push(_item);
      this.taskObj.task = "";
      this.taskObj.id = 0;
    },
    doThing(val) {
      this.list.forEach(item => {
        if (item.id == val) {
          item.complete = true;
        }
      });
    }
  }
};
</script>
<style scoped>
.item_p {
  width: 400px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
