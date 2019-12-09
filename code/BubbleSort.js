// const bubble_sort = arr => {
//   let len = arr.length;
//   if (len <= 1) return arr;
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (arr[i] > arr[j]) {
//         [arr[i], arr[j]] = [arr[j], arr[i]]
//       }
//     }
//   }
//   console.log(arr)
// }

let a = [7,3,9,5,1,8,4,6,2,0]
let b = [9,8,7,6,5,4,3,2,1,0]

// bubble_sort(a)

// 优化，无交换则直接结束返回arr
const bubble_sort_revert = arr => {
  let len = arr.length;
  if (len <= 1) return arr;
  console.log('start sort')
  for (let i = 0; i < len; i++) {
    let count = 0;
    for (let j = i + 1; j < len; j++) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
        count += 1
      }
    }
    console.log('arr:', arr)
    if (!count) break;
  }
  console.log(arr)
}

bubble_sort_revert(a)
bubble_sort_revert(b)