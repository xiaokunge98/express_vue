import { Loading } from "element-ui";
function startLoading(loading) {
  loading = Loading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0,0,0,0.7)"
  });
  return loading;
}
function endLoading(loading) {
  loading.close();
}
export { startLoading, endLoading };
