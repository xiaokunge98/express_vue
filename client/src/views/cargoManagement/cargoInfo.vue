<template>
  <div class="container">
    <head-top :router-path="$route.path"></head-top>
    <div class="content_box">
      <div class="search_box">
        <el-input
          v-model="searchQuery.searchContent"
          @keyup.native.enter="doSearch"
          placeholder="请输入查询关键字"
        ></el-input>
        <el-button @click="doSearch" type="primary">搜索</el-button>
      </div>
      <div class="tableInfo">
        <data-table :data-list="list" :table-header="tableHeader">
          <el-table-column label="操作" width="200px" align="center">
            <template v-slot="scope">
              <el-button
                @click="doRowUpdate(scope.row)"
                size="mini"
                type="primary"
                >修改</el-button
              >
              <el-button
                @click="doRowDelete(scope.row.id)"
                size="mini"
                type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </data-table>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/headTop/headTop.vue";
import cargoList from "../../mock/cargoInfoList";
import dataTable from "../../components/dataTable/dataTable.vue";
export default {
  name: "cargoInfo",
  components: {
    headTop,
    dataTable
  },
  data() {
    return {
      searchQuery: {
        searchContent: ""
      },
      list: [
        { id: 0, name: "水泥", cost: 1500, weight: 50 },
        { id: 2, name: "水泥", cost: 3000, weight: 100 }
      ],
      tableHeader: [
        {
          prop: "name",
          label: "姓名",
          width: "200px"
        },
        {
          prop: "weight",
          label: "重量",
          width: "200px",
          align: "right"
        },
        {
          prop: "cost",
          label: "花费",
          width: "200px",
          align: "right"
        }
      ]
    };
  },
  created() {
    this.list = cargoList;
  },
  methods: {
    /**1、信息搜索操作 */
    doSearch() {
      console.log("收缩");
    },
    /**2、信息修改操作 */
    doRowUpdate(row) {
      console.log(row);
    },
    /**3、信息删除操作 */
    doRowDelete(id) {
      console.log(id);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
}
.content_box {
  margin-top: 10px;
}
.search_box {
  width: 40%;
  .el-input {
    margin-left: 10px;
    width: 70%;
  }
}
.tableInfo {
  margin-top: 15px;
}
</style>
