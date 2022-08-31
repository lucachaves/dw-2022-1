// decision
// if else statement
let number = 10;

if (number >= 0) console.log('This number is positive');

number = 0;

if (number >= 0) {
  console.log('This number is positive');
}

number = -10;

if (number >= 0) {
  console.log('This number is positive');
} else {
  console.log('This number is not positive');
}

console.log(
  number >= 0 ? 'This number is positive' : 'This number is not positive'
);

number = 0;

if (number > 0) {
  console.log('This number is greater than zero');
} else if (number < 0) {
  console.log('This number is less than zero');
} else {
  console.log('This number is equal to zero');
}

// switch
const number1 = 10;
const number2 = '20';
const operator = '+'; // +, -
let result;

switch (operator) {
  case '+':
    result = Number(number1) + Number(number2);
    break;

  case '-':
    result = number1 - number2;
    break;

  default:
    result = 'Invalid operator';
}

console.log(result);

number = 0;

// if () {
//   console.log('This number is greater than zero');
// } else if (number < 0) {
//   console.log('This number is less than zero');
// } else {
//   console.log('This number is equal to zero');
// }

switch (true) {
  case number > 0:
    console.log('This number is greater than zero');
    break;

  case number < 0:
    console.log('This number is less than zero');
    break;

  default:
    console.log('This number is equal to zero');
}

// loops

// while statement
let numbers = '';
let count = 0;

while (count < 100) {
  numbers += count;
  count++;
}

console.log(numbers);

// do while statement
numbers = '';
count = 0;

do {
  numbers += count;
  count++;
} while (count < 100);

console.log(numbers);

// for statement
numbers = '';

for (let count = 0; count < 100; count++) {
  if (count < 10) numbers += '0';

  numbers += count;

  if (count % 10 === 9) {
    numbers += '\n';
  } else {
    numbers += ', ';
  }
}

console.log(numbers);

// 00, 01, 02 ... 09
// 10, 11, 12 ... 19
// ...
// 90, 91, 92 ... 99
