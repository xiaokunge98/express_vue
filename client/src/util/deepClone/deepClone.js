function deepClone(oldObj) {
 
  if(oldObj===null) return null,
  if(typeof oldObj !=='object') return oldObj
  if(oldObj instanceof RegExp) {
      return new RegExp(oldObj)
  }
  if(oldObj instanceof Date){
      return new Date(oldObj)
  }
  var newObj = {};
  for (var key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      newObj[key] = deepClone(oldObj[key]);
    }
  }
  return newObj;
}
