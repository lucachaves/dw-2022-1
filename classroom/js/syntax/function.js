// function declaration
function sum(a, b) {
  return a + b;
}

// anonymous/lambda function
const minus = function (a, b) {
  return a - b;
};

// arrow function
const product = (a, b) => {
  return a * b;
};

const divide = (a, b) => a / b;

console.log(sum(1, 1));
console.log(minus(1, 1));
console.log(product(1, 1));
console.log(divide(10, 2));
