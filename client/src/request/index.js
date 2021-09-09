import axios from "axios";
import { Loading, Message } from "element-ui";

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中",
    background: "rgba(0,0,0,0.7)"
  });
}
function endLoading() {
  loading.close();
}
const instance = axios.create({
  baseURL: "",
  timeout: 5000
});
//请求拦截
instance.interceptors.request.use(
  config => {
    startLoading();
    if (sessionStorage.getItem("eleToken"))
      config.headers.authorize = sessionStorage.getItem("eleToken");
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  response => {
    endLoading();
    return response;
  },
  err => {
    endLoading();
    Message.error(err.response.data);
    return Promise.reject(err);
  }
);
export default instance;
