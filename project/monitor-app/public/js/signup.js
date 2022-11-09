const form = document.querySelector('form');

async function handleSubmit(event) {
  event.preventDefault();

  // const [name, email, password, confirmationPassword] =
  //   document.querySelectorAll('input');

  // const user = { name, email, password, confirmationPassword };

  const user = Object.fromEntries(new FormData(form));

  const config = {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('http://localhost:3000/users', config);

  if (response.ok) {
    location.href = '/signin.html';
  } else {
    console.log('Error no cadastro');
  }
}
