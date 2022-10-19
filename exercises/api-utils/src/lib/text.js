export function processText(text, action) {
  switch (action.toLowerCase()) {
    case 'lowercase':
      return text.toLowerCase();
    case 'uppercase':
      return text.toUpperCase();
  }
}
