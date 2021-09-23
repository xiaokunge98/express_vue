// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./assets/reset.css";
// import "./element/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store/store";
import Axios from "axios";
import * as echarts from "echarts";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

Vue.use(Antd);
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
