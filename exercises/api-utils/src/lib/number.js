export function processNumber(numbers, action) {
  switch (action.toLowerCase()) {
    case 'minimum':
      return Math.min(...numbers);
    case 'maximum':
      return Math.max(...numbers);
  }
}
