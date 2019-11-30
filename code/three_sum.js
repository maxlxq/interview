/**
 * 
 */
const three_sum = nums => {
  nums = nums.sort((a, b) => a - b)
  let [res, left, right] = [[], 0, nums.length - 1]
  for (let [index, num] of nums.entries()) {
    if (num > 0) return res;
    if (num === nums[index - 1]) continue;
    left = index + 1
    right = nums.length - 1
    let temp = 0
    while (left < right) {
      temp = num + nums[left] + nums[right]
      if (temp === 0) {
        res.push([num, nums[left], nums[right]])
        left ++
        right --
        while (left < right && num[left] === nums[left - 1]) { left ++ }
        while (left < right && num[right] === nums[right + 1]) { right -- }
      } else if (temp < 0) {
        left ++
      } else {
        right --
      }
    }
  }
  return res
}