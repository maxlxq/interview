let a = [13,54,23,77,68,43,1,4,6,8,9]

const shell_sort = arr => {
  const len = arr.length;
  if (len <= 1) return arr;
  for (let f = Math.floor(len / 2); f >= 1; f = Math.floor(f / 2)) {
    for (let i = f; i < len; i++) {
      for (let j = i - f; j >= 0 && arr[j] > arr[f + j]; j -= f) {
        [arr[j], arr[j + f]] = [arr[j + f], arr[j]]
      }
    }
  }
  return arr;
}

let result = shell_sort(a)

console.log(result)