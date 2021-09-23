<template>
  <div class="container">
    <head-top :router-path="$route.path"></head-top>
    <div class="content_box">
      <div class="content_header">
        <div class="search_box">
          <el-input
            v-model="searchQuery.searchContent"
            @keyup.native.enter="doSearch(searchQuery.searchContent)"
            placeholder="请输入查询物品名"
            clearable
          ></el-input>
        </div>
        <div class="condition_search">
          <el-input
            v-model="searchQuery.lowest"
            placeholder="最低价格"
            clearable
          >
          </el-input
          >--
          <el-input
            v-model="searchQuery.highest"
            placeholder="最高价格"
            clearable
          >
          </el-input>
          <el-button @click="priceSearch" type="primary">搜索</el-button>
        </div>
        <div class="operation_box">
          <el-button @click="doCreate" type="primary">新增</el-button>
        </div>
      </div>
      <div class="tableInfo">
        <data-table :data-list="list" :table-header="tableHeader" type>
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
      <div align="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.pageIndex"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="pageInfo.pageSize"
          layout="sizes, prev, pager, next"
          :total="findList.length"
        >
        </el-pagination>
      </div>
    </div>
    <cargo-dialog
      :dialog-visible.sync="sonVisible"
      @get-cargo-list="getCargo"
      :dialog-status="sonStatus"
      :dialog-model="cargoModel"
    ></cargo-dialog>
  </div>
</template>
<script>
import request from "../../request/index";
import headTop from "../../components/headTop/headTop.vue";
import cargoList from "../../mock/cargoInfoList";
import dataTable from "../../components/dataTable/dataTable.vue";
import cargoDialog from "./cargoComponent/cargoDialog.vue";
const cargoStruct = {
  id: "",
  goodName: "",
  goodPrice: "",
  goodNum: "",
  goodAddress: ""
};
export default {
  name: "cargoInfo",
  components: {
    headTop,
    dataTable,
    cargoDialog
  },
  data() {
    return {
      searchQuery: {
        searchContent: "",
        lowest: "",
        highest: ""
      },
      pageInfo: {
        pageSize: 5,
        pageIndex: 1
      },
      sonVisible: false,
      sonStatus: "",
      cargoModel: Object.assign({}, cargoStruct),
      opMap: {
        create: "add",
        update: "update",
        browse: "browse"
      },
      list: [],
      findList: [],
      tableHeader: [
        {
          prop: "goodName",
          label: "物品名",
          width: "110px"
        },
        {
          prop: "goodPrice",
          label: "物品价格",
          width: "100px"
        },
        {
          prop: "goodNum",
          label: "物品购买量",
          width: "100px"
        },
        {
          prop: "goodAddress",
          label: "物品购买商",
          width: "200px"
        }
      ]
    };
  },
  created() {
    this.getCargo();
  },
  watch: {
    "searchQuery.searchContent"(val) {
      if (val) {
        this.doSearch(val);
      } else {
        this.doSearch("");
        this.handleSizeChange(this.pageInfo.pageSize);
      }
    }
  },

  computed: {},
  methods: {
    /**1、信息搜索操作 */
    doSearch(val) {
      var content = val.trim();
      var _list = [];
      _list = this.findList.filter(item => {
        return item.goodName.trim().indexOf(content) !== -1;
      });
      this.list.splice(0, this.list.length, ..._list);
    },
    // 价格搜索
    priceSearch() {
      var lowest = this.searchQuery.lowest ? this.searchQuery.lowest : 0;
      var highest = this.searchQuery.highest
        ? this.searchQuery.highest
        : Infinity;
      var _list = [];
      _list = this.findList.filter(item => {
        return item.goodPrice >= lowest && item.goodPrice <= highest;
      });
      this.list.splice(0, this.list.length, ..._list);
    },
    /**
     * 1、单页数量显示
     */
    handleSizeChange(sizes) {
      // var _list = [];
      this.pageInfo.pageSize = sizes;
      var startIndex = (this.pageInfo.pageIndex - 1) * sizes; // 开始查找的条数
      var endIndex = this.pageInfo.pageIndex * sizes; // 开始查找的条数
      this.list.splice(0, this.list.length);
      for (let i = startIndex; i < endIndex; i++) {
        if (this.findList[i]) {
          this.list.push(this.findList[i]);
        }
      }
    },
    /**
     * 1、当前页
     * */

    handleCurrentChange(pages) {
      var startIndex = (pages - 1) * this.pageInfo.pageSize;
      var endIndex = pages * this.pageInfo.pageSize;
      this.list.splice(0, this.list.length);
      for (let i = startIndex; i < endIndex; i++) {
        if (this.findList[i]) {
          this.list.push(this.findList[i]);
        }
      }
    },
    // 获取所有信息
    async getCargo() {
      const { data } = await request.get("/api/goods/allGoods");
      this.list.splice(0);
      this.findList.splice(0);
      data.forEach(item => {
        this.list.push(item);
        this.findList.push(item);
      });
      this.handleSizeChange(this.pageInfo.pageSize);
    },
    /**2、新增物品 */
    doCreate() {
      this.sonStatus = this.opMap.create;
      this.cargoModel = Object({}, cargoStruct);
      this.sonVisible = true;
    },
    /**2、信息修改操作 */
    doRowUpdate(row) {
      this.cargoModel = Object({}, cargoStruct);
      for (var k in row) {
        this.cargoModel[k] = row[k];
      }
      this.sonStatus = this.opMap.update;
      this.sonVisible = true;
    },
    /**3、信息删除操作 */
    doRowDelete(id) {
      request.delete(`/api/goods/delete/${id}`).then(res => {
        if (res) {
          this.getCargo();
          this.$notify({
            title: "成功",
            message: "删除成功!",
            type: "success"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content_box {
  margin-top: 10px;
  .content_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .operation_box {
      // float: right;
    }
    .condition_search {
      margin-left: -200px;
      .el-input {
        width: 150px;
      }
    }
    .search_box {
      width: 35%;
      .el-input {
        margin-left: 10px;
        width: 70%;
      }
    }
  }
}
.tableInfo {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 20px;
  position: absolute;
  right: 100px;
  bottom: 50px;
}
</style>
