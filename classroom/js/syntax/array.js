// create array with values
const numbers = [1, 2, 3];

console.log(numbers[2]);

// create empty array
const values = [];

console.log(values.length); // property length

// add values
console.log(values[0]);

values[0] = 1;

console.log(values[0]);
console.log(values);

values.push(2); // Array.pop
console.log(values);

values.unshift(0); // Array.shift
console.log(values);

// multiple types
const person = [123, 'Luiz', true, ['luiz@email.com']];
console.log(person[3][0]);

// destructuring arrays
// const name = person[1];
// const email = person[3][0];

// [123, 'Luiz', true, ['luiz@email.com']]
const [, name, , [email]] = person;
console.log(name);
console.log(email);

// spread
const subjects = ['DW', 'LM', 'LS', 'LP2'];
// person[person.length] = subjects;
// console.log(person);
// console.log(person[person.length - 1]);

const teacher = [...person, subjects];
console.log(teacher);
console.log(teacher[teacher.length - 1]);

console.log(Math.min(10, 5, 100));
console.log(Math.min(...numbers));

function sum(...values) {
  let total = 0;

  for (const value of values) {
    total += value;
  }

  return total;
}

console.log(sum(1, 2, 3));
console.log(sum(1, 2));

// iteration
// [1, 2, 3]
// f(x) = 2x
// [2, 4, 6]
console.log(numbers.map((value) => 2 * value));
console.log(numbers.filter((value) => !(value & 1)));
console.log(numbers.every((value) => !(value & 1)));
console.log(numbers.some((value) => !(value & 1)));
