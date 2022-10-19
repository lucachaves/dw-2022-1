export function processText(text: string, action: string) {
  switch (action.toLowerCase()) {
    case 'lowercase':
      return text.toLowerCase();
    case 'uppercase':
      return text.toUpperCase();
  }
}
