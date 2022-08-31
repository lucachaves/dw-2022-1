// without declaration keyword
variable = 0;
console.log(variable);

// const
const number = 10;
console.log(number);

// 'const' declarations must be initialized.
// const number2;

// TypeError: Assignment to constant variable.
// number = 100;

// not imutable
const numbers = [1, 2];
numbers[2] = 3;
console.log(numbers);

// Cannot redeclare block-scoped variable 'number'
// const number = 100;

// let
let value = 20;
console.log(value);

value = 200;
console.log(value);

// Cannot redeclare block-scoped variable 'value'
// let value = 200;

// var
var variable = 30;
console.log(variable);

var variable = 300;
console.log(variable);

// reassignment
variable = 3000;

// dynamic types
let type = 10;
console.log(type);

type = true;
console.log(type);

// case sensitive
const TYPE = 'type';
console.log(TYPE);
console.log(type);

// weak type
const a = 10;
const b = '5';
console.log(a - b);
