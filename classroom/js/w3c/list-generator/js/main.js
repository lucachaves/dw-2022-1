function generateList(length) {
  const listItems = [];

  for (let item = 1; item <= length; item++) {
    listItems.push(`<li>Item ${item}</li>`);
  }

  return listItems.join('');
}

function handleSubmit(event) {
  event.preventDefault();

  const length = document.querySelector('input');

  const ul = document.querySelector('ul');

  ul.innerHTML = generateList(length.value);
}
