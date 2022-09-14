// [1, 2, 3]
// acc value
// 0   1
// 1   2
// 3   3
// 6

function sum(...values) {
  return values.reduce((acc, value) => acc + value, 0);
}

function sumOdds(...values) {
  return values
    .filter((value) => value & 1)
    .reduce((acc, value) => acc + value, 0);
}

function product(...values) {
  return values.reduce((acc, value) => acc * value, 1);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(2, 2, 2)); // 6
console.log(sum(1, 2, 3, 4, 5, 6)); // 21
console.log(sumOdds(1, 2, 3)); // 4
console.log(sumOdds(2, 2, 2)); // 0
console.log(sumOdds(1, 2, 3, 4, 5, 6)); // 9
console.log(product(1, 2, 3)); // 6
console.log(product(2, 2, 2)); // 8
console.log(product(1, 2, 3, 4, 5, 6)); // 720
