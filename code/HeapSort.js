
const buildHeap = arr => {
  let len = arr.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapAjust(arr, i, len)
  }
}

const heapAjust = (arr, i, len) => {
  let child = 2 * i + 1;
  while (child <= len) {
    let temp = arr[i];
    if (child + 1 <= len && arr[child] < arr[child + 1]) {
      child += 1
    }
    if (arr[i] < arr[child]) {
      arr[i] = arr[child]
      arr[child] = temp
      i = child
      child = 2 * i + 1
    } else {
      break
    }
  }
}

const heapSort = arr => {
  arr = arr.slice(0)
  if (!(arr instanceof Array)) {
    return null
  }
  if (arr instanceof Array && arr.length === 1) {
    return arr
  }
  buildHeap(arr)

  let len = arr.length

  for (let i = len - 1; i >= 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]]
    heapAjust(arr, 0, i - 1)
  }
  return arr
}

const a = [66,88,99,33,22,11,44,55,77,10]
let res = heapSort(a)

console.log(res)