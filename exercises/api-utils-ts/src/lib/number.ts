export function processNumber(numbers: number[], action: string) {
  switch (action.toLowerCase()) {
    case 'minimum':
      return Math.min(...numbers);
    case 'maximum':
      return Math.max(...numbers);
  }
}
