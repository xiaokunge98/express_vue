<template>
  <el-table
    :data="list"
    border
    highlight-current-row
    v-bind="$attrs"
    v-on="$listeners"
    class="table_container"
  >
    <el-table-column
      v-for="(col, index) in header"
      :prop="col.prop"
      :label="col.label"
      :align="col.align ? col.align : 'left'"
      :width="col.width ? col.width : '100px'"
      :key="index"
    >
    </el-table-column>
    <slot></slot>
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
  created() {}
};
</script>
<style scoped>
.table_container {
  margin-left: 10px;
  margin-top: 20px;
}
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
