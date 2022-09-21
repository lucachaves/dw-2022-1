function calc(operand1, operand2, operator) {
  return eval(`${operand1} ${operator} ${operand2}`);
}

function handleCalcClick(operator) {
  // [operand1, operand2, result] = [<input>, <input>, <input>]
  const [operand1, operand2, result] = document.querySelectorAll('input');

  result.value = calc(operand1.value, operand2.value, operator);
}
