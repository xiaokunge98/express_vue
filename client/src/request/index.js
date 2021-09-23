import axios from "axios";
import { Loading, Message } from "element-ui";
import { startLoading, endLoading } from "../util/loading.js";
let loading; //开始动画变量
let closeLoading; //结束动画变量
const instance = axios.create({
  baseURL: "",
  timeout: 5000
});
//请求拦截
instance.interceptors.request.use(
  config => {
    closeLoading = startLoading(loading);
    const token = sessionStorage.getItem("eleToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  response => {
    endLoading(closeLoading);
    return response;
  },
  err => {
    endLoading(closeLoading);
    Message.error(err.data);
    return Promise.reject(err);
  }
);
export default instance;
