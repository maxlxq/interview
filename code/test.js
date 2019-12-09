let a = [5,7,9,1,3,8,2,4,6,0,10]
//
 // class QuickSort {
//   quick_sort = (arr, first, last) => {
//     if (first >= last) return;
//     let [i, j] = [first, last];
//     let key = first;
//     let temp = arr[first];
//     while (i < j) {
//       while (i < j && temp < arr[j]) {
//         j--;
//       }
//       arr[i] = arr[j];
//       while (i < j && arr[i] < temp) {
//         i++;
//       }
//       arr[j] = arr[i];
//     }
//     key = i;
//     arr[i] = temp;

//     console.log('arr:', arr);

//     this.quick_sort(arr, first, key - 1);
//     this.quick_sort(arr, key + 1, last)
//   }

//   run(arr) {
//     const len = arr.length;
//     this.quick_sort(arr, 0, len - 1);
//     console.log('result arr:', arr)
//   }
// }

// let q = new QuickSort()

// q.run(a)

// const qsort = (arr, first, last) => {
//   if (first >= last) return null;
//   let [i,j] = [first,last]
//   let pivot = arr[i]
//   while(i<j) {
//     while(i<j && pivot <= arr[j]){
//       j--
//     }
//     arr[i] = arr[j]
//     while(i<j && arr[i] <= pivot) {
//       i++
//     }
//     arr[j] = arr[i]
//   }
//   arr[i] = pivot
//   qsort(arr, first, i - 1)
//   qsort(arr, i + 1, last)
// }

// qsort(a, 0, a.length - 1)
// console.log(a)