// quick_sort
const qsort = (nums, first, last) => {
  if (first > last) return;
  let key = nums[first]
  let [left, right] = [first, last]
  while (left !== right) {
    while (left < right && key <= nums[right]) {
      right--
    }
    while (left < right && key >= nums[left]) {
      left++
    }
    if (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
    }
  }
  nums[first] = nums[left]
  nums[left] = key
  qsort(nums, first, left - 1)
  qsort(nums, left + 1, last)
}
const quick_sort = nums => {
  let len = nums.length
  qsort(nums, 0, len - 1)
}

export default class QuickSort {
  quick_sort = (arr, first, last) => {
    if (first >= last) return;
    let [i, j] = [first, last];
    let temp = arr[first];
    while (i < j) {
      while (i < j && temp < arr[j]) {
        j--;
      }
      arr[i] = arr[j];
      while (i < j && arr[i] < temp) {
        i++;
      }
      arr[j] = arr[i];
    }
    arr[i] = temp;

    console.log('arr:', arr);

    this.quick_sort(arr, first, key - 1);
    this.quick_sort(arr, key + 1, last)
  }

  run(arr) {
    const len = arr.length;
    this.quick_sort(arr, 0, len - 1);
    console.log('result arr:', arr)
  }
}