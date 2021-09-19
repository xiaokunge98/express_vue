/** 设置cookie信息*/

function setCookie(uName, uPassWord, expiredays) {
  // 当前时间exdate
  var exdate = new Date();
  //   默认过期时间为半天
  if (!expiredays && expiredays !== 0) {
    expiredays = 1;
  }
  // setDate为Date内置方法用来设置当前月的某一天
  // getDate用来返回月份的某一天
  exdate.setDate(exdate.getDate() + expiredays);
  // encodeURIComponent为转义特殊字符串
  // decodeURIComponent为解析特殊字符串
  document.cookie =
    uName +
    "=" +
    decodeURIComponent(uPassWord) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}
/**获取cookie中存的数据 */
function getCookie(key) {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(key + "=");
    if (start !== -1) {
      start = start + key.length + 1;
      var end = document.cookie.indexOf(";", start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
}

export { setCookie, getCookie };
