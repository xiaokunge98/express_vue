<template>
  <el-table :data="list" border highlight-current-row>
    <el-table-column
      v-for="(item, index) in header"
      :prop="item.prop"
      :label="item.label"
      :width="item.width ? item.width : '100px'"
      :key="index"
    ></el-table-column>
  </el-table>
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
    tableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      list: this.dataList,
      header: this.tableHeader
    };
  },
  created() {
    console.log(this.list, this.tableHeader);
  }
};
</script>
<style scoped>
.el-table::before {
  height: 0px;
}
.el-table--border::after,
.el-table--group::after {
  height: 0px;
}
.el-table--border {
  border-top: none;
}
.el-table {
  color: black;
}
.el-table thead {
}
.el-table >>> td {
  border: 1px solid black;
  border-right: none;
  /* border-bottom: none; */
}
.el-table >>> th.is-leaf {
  border: 1px solid black;
  border-bottom: none;
}
.el-table >>> th.is-leaf:nth-child(1) {
  border-right: none;
}
.el-table >>> td:last-child {
  border-right: 1px solid black;
}
</style>
