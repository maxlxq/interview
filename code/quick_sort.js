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