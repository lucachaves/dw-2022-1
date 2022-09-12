import math, { sum } from "./math.js";
import { sqrt } from "mathjs";
import promptSync from "prompt-sync";

const input = promptSync();

console.log(sum(1, 1));
console.log(math.minus(1, 1));
console.log(math.product(1, 1));
console.log(math.divide(10, 2));
console.log(sqrt(25));

const number = input("Digite um número: ");
console.log("Sqrt: " + sqrt(number));
