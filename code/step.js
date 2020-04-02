
function step(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return step(n - 1) + step(n - 2)
}