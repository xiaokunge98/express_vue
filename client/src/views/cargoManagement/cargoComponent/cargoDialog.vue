<template>
  <div class="dialog_container">
    <el-dialog
      title="提示"
      :visible="selfVisible"
      close-on-press-escape
      :close-on-click-modal="false"
      width="30%"
      @close="closeDialog"
    >
      <el-form :model="cargoModel" ref="cargoModelRef" label-width="100px">
        <el-form-item label="物品名">
          <el-input v-model="cargoModel.goodName"> </el-input>
        </el-form-item>
        <el-form-item label="物品价格">
          <el-input v-model="cargoModel.goodPrice"> </el-input>
        </el-form-item>
        <el-form-item label="物品数量">
          <el-input v-model="cargoModel.goodNum"> </el-input>
        </el-form-item>
        <el-form-item label="物品购买商">
          <el-input v-model="cargoModel.goodAddress"> </el-input>
        </el-form-item>
      </el-form>
      <div class="footer" align="center">
        <el-button type="primary" @click="doConfirm">确定</el-button>
        <el-button type="warning" @click="doCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../../request/index";
const cargoStruct = {
  id: "",
  goodName: "",
  goodPrice: "",
  goodNum: "",
  goodAddress: ""
};
export default {
  name: "cargoDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogModel: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dialogStatus: {
      type: String,
      type: ""
    }
  },
  data() {
    return {
      selfVisible: this.dialogVisible,
      selfStatus: this.dialogStatus,
      cargoModel: Object.assign({}, cargoStruct)
    };
  },
  created() {
    // console.log(this.selfVisible);
  },
  watch: {
    // 弹窗关闭状状态
    dialogVisible(val) {
      this.selfVisible = val;
    },
    selfVisible(val) {
      this.$emit("update:dialogVisible", val);
    },
    // 弹窗显示数据状态
    dialogModel(val) {
      this.cargoModel = JSON.parse(JSON.stringify(val));
    },
    // 操作状态
    dialogStatus(val) {
      this.selfStatus = val;
    }
  },
  methods: {
    closeDialog() {
      this.selfVisible = false;
    },
    // 确定新增
    doConfirm() {
      this.$refs.cargoModelRef.validate(valid => {
        if (valid) {
          if (this.selfStatus == "add") {
            this.doAdd();
          } else if (this.selfStatus == "update") {
            this.doUpdate();
          }
        }
      });
    },
    // 1、确定新增
    doAdd() {
      request.post("/api/goods/add", this.cargoModel).then(res => {
        if (res) {
          this.$emit("get-cargo-list");
          this.$notify({
            title: "成功",
            message: "新增成功!",
            type: "success"
          });
          this.selfVisible = false;
        }
      });
    },
    // 确定修改
    doUpdate() {
      request.put("/api/goods/update", this.cargoModel).then(res => {
        if (res) {
          this.$emit("get-cargo-list");
          this.$notify({
            title: "成功",
            message: "更新成功!",
            type: "success"
          });
          this.selfVisible = false;
        }
      });
    },
    // 取消操作
    doCancel() {
      this.cargoModel = Object.assign({}, cargoStruct);
      this.selfVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog_container >>> .el-dialog {
  border-radius: 15px;
  .el-dialog__header {
    background: #00bfff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
}
</style>
