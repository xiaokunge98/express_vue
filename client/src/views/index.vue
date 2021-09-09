<template>
  <div class="xie_contanner">
    <h3>支付方页面</h3>
    <el-form label-width="100px">
      <el-form-item label="支付金额">
        <el-input v-model="payValue"></el-input>
      </el-form-item>

      <el-form-item label="点击支付">
        <el-button @click="toalipay('ALI_APP')" type="primary">{{
          alipay
        }}</el-button>
        <el-button type="primary" @click="towxpay('WX_APP')">{{
          wxpay
        }}</el-button>
      </el-form-item>

      <el-form-item label="支付方式">
        <el-input v-model="payWay"></el-input>
      </el-form-item>

      <el-form-item label="支付金额">
        <el-input v-model="payValue"></el-input>
      </el-form-item>

      <el-form-item label="订单号">
        <el-input v-model="bill_no"></el-input>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-input v-model="status"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      payValue: 20,
      alipay: "支付宝支付",
      wxpay: "微信支付",
      channel_id: "",
      bill_no: "", //订单号
      status: "",
      payData: {
        nonce_str: "140621890131",
        package: "Sign=WXPay",
        resultCode: 0,
        errMsg: "OK:",
        prepay_id: "wx19025829014811cec357f9c28166190000",
        result_msg: "OK",
        partner_id: "1230636401",
        err_detail: "",
        result_code: 0,
        id: "2ae65ala-ff2b-4295-8151-e9ala32d157d",
        app_id: "wx0411fa6a39d61297",
        pay_sign: "CC4CA692510EF7FFCF7A1CB8036CF114",
        timestamp: "1605725909"
      }
    };
  },
  computed: {
    payWay() {
      return this.channel_id == "ALI_APP"
        ? "支付宝支付"
        : this.channel_id == "WX_APP"
        ? "微信支付"
        : "";
    }
  },
  created() {},

  methods: {
    // 点击支付宝支付
    toalipay(id) {
      this.channel_id = id;
      this.bill_no = this.orderNumber();
      this.fBeecloundPay(id);
    },
    // 点击微信支付
    towxpay(id) {
      this.channel_id = id;
      this.bill_no = this.orderNumber();
      this.fBeecloundPay(id);
    },
    // 生成订单号
    orderNumber() {
      return "" + Math.floor(Math.random() * 10000000000 + 10000000000);
    },
    // 构建给后端传递数据的函数
    fBeecloundPay(id) {
      /**
       * 构建支付参数
       * app_id: APPID
       * channel: 支付方式
       * title: 商品标题
       * total_fee：支付金额
       * bill_no：订单号
       * bill_timeout：过期时间
       */
      var payData = {
        app_id: "4401a13-965f-4b27-ba9f-da678b47f3f5",
        channel: id,
        title: "商品标题",
        total_fee: this.payValue * 100,
        bill_no: this.bill_no,
        bill_timeout: 300
      };
      this.payReq(
        payData,
        () => {
          // 支付成功的回调
          this.status = "支付成功";
        },
        () => {
          // 支付失败的回调
          this.status = "支付失败";
        }
      );
    },
    //  支付过程
    payReq(payData, successCb, errorCb) {
      this.doPay(payData, successCb, errorCb);
    },
    // 发送支付-》支付请求
    doPay(payData, successCb, errorCb) {
      if (this.payData.result_code == 0) {
        this.wechatPay();
      }
    },

    // 微信支付
    wechatPay() {
      var staement = {
        appid: this.payData.app_id,
        noncestr: this.payData.nonce_str,
        package: this.payData.package,
        partnerid: this.payData.partner_id,
        prepayi: this.payData.prepay_id,
        timestamp: this.payData.timestamp,
        sign: this.payData.pay_sign
      };
      this.getWechatCode(staement);
    },
    getWechatCode(staement) {
      this.wechatPayUrl = staement;
      if (!this.flag) {
        //重点是这里，其余的是为了我的切换业务逻辑和接口
        let wechatcode = new QRCode("wechatcode", {
          width: 200,
          height: 200,
          text: this.wechatPayUrl, // 二维码地址
          colorDark: "#000",
          colorLight: "#fff"
        });
      }
      this.flag = true;
      this.loading = false;
      this.isWechatCodeShow = true;
      this.getOrderStatus();
    }
  }
};
</script>
<style scoped>
.xie_contanner {
  /* width: 30%;
  height: 40%; */
  /* background: aqua; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.xie_contanner >>> .el-input__inner {
  background: aqua;
}
</style>
