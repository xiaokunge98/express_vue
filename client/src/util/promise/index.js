function promiseAll(promiseList) {
  // 判断传入的是不是promise对象
  for (var i = 0; i < promiseList.length; i++) {
    if (!promiseList[i].then) {
      throw new TypeError("请输入promsie类型数组");
    }
  }
  var count = 0; //记录正确返回promise的数量
  var sucRes = [];
  var errRes = [];
  return new Promise((resolve, reject) => {
    for (var i = 0; i < promiseList.length; i++) {
      (function(i) {
        promiseList[i]
          .then(res => {
            sucRes[i] = res;
            count++;
            if (count == promiseList.length) {
              resolve(sucRes);
            }
          })
          .catch(err => {
            errRes[i] = err;
            sucRes[i] = undefined;
            count++;
            if (count === promiseList.length) {
              reject(errRes);
            }
          });
      })(i);
    }
  });
}
export { promiseAll };
