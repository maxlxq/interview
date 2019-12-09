let a = [5,7,9,3,1,4,2,6,8,0]

const insert_sort = arr => {
  let len = arr.length;
  if (len <= 1) return arr;
  for (let i = 1; i < len; i++) {
    let temp = arr[i];
    let j = i;
    for (; j > 0; j--) {
      if (temp > arr[j-1]) {
        break;
      }
      arr[j] = arr[j-1]
    }
    arr[j] = temp
  }
  return arr;
}

let result =insert_sort(a)
console.log(result)