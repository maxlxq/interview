
// 实现一个JSON.stringify
function jsonStringify(obj) {
  let type = typeof obj
  if (type !== 'object') {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"'
    }
    return String(obj)
  } else {
    let json = []
    let arr = Array.isArray(obj)
    for (let k in obj) {
      let v = obj[k]
      let type = typeof v
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"'
      } else if (type === 'object') {
        v = jsonStringify(v)
      }
      json.push((arr ? "" : '"' + k + '":') + String(v))
    }
    return ((arr ? "[" : "{") + String(json) + (arr ? "]" : "}"))
  }
}

// 实现一个new操作符
function New(func) {
  let res = {}
  if (func.prototype !== null) {
    res.__proto__ = func.prototype
  }
  let ret = func.apply(res, Array.prototype.slice.call(arguments, 1))
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret
  }
  return res
}