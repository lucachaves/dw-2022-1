// expression (commands: variable, literal, operator) => (value)
1 + 1;
const x = 1;

// operators
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
console.log(10 - 2 + 5 * 2);

// grouping
console.log((10 - 2 + 5) * 2);

// Equality operator: equality vs strick equality
console.log(1 == 1);
console.log(1 === 1);
console.log(1 == '1');
console.log(1 === '1');

// Binary bitwise
// 10 - 0b1010
//  1 - 0b0001 &
//  0 - 0b0000
console.log(10 & 1);
// 10 - 0b1011
//  1 - 0b0001 &
//  1 - 0b0001
console.log(11 & 1);
console.log(12 & 1);
console.log(13 & 1);

// binary logical
let count;
const result = count ?? 10;
console.log(result);
