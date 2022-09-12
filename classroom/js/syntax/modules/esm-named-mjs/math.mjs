export function sum(a, b) {
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

export { minus, product, divide };
