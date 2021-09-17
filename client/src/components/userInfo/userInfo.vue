<template>
  <div class="container">
    <el-form label-width="90px" disabled>
      <el-row>
        <el-col class="col_top" :span="20">
          <el-form-item label="姓名">
            <el-input v-model="userModel.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="邮箱号">
            <el-input v-model="userModel.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="用户等级">
            <el-input v-model="userModel.identity"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        ><el-col :span="20">
          <el-form-item label="使用时长">
            <el-input v-model="userModel.date"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
const userStruct = {
  email: "",
  name: "",
  identity: "",
  date: null
};
export default {
  name: "userInfo",
  data() {
    return {
      userModel: Object.assign({}, userStruct)
    };
  },
  created() {
    this.getuserInfo();
  },
  methods: {
    getuserInfo() {
      this.userModel = JSON.parse(JSON.stringify(this.$store.state.userInfo));
      if (this.userModel.identity == "manager") {
        this.userModel.identity = "管理员";
      } else {
        this.userModel.identity = "普通用户";
      }
    }
  }
};
</script>
<style scoped>
.container {
  width: 70%;
  border: 1px solid wheat;
  border-radius: 10px;
  background: coral;
}
.col_top {
  padding-top: 17px;
}
.el-col >>> .el-input.is-disabled .el-input__inner {
  color: black;
}
</style>
