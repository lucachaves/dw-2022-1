const tbody = document.querySelector("tbody");

let hosts = [];

function insertHostRow({ id, name, address }) {
  const hostRow = `<tr id="host-${id}">
    <td>${name}</td>
    <td>${address}</td>
    <td>
      <i class="fa-solid fa-stopwatch"></i>
      <i class="ms-3 fa-solid fa-trash-can" onclick="removeHost(${id})"></i>
    </td>
  </tr>`;

  tbody.insertAdjacentHTML("beforeend", hostRow);
}

async function loadHosts() {
  hosts = await (await fetch("http://localhost:3000/hosts")).json();

  hosts.map((host) => insertHostRow(host));
}

async function handleSubmit(event) {
  event.preventDefault();

  const [name, address] = document.querySelectorAll("input");

  const host = {
    name: name.value,
    address: address.value,
  };

  const config = {
    method: "post",
    body: JSON.stringify(host),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const newHost = await (
    await fetch("http://localhost:3000/hosts", config)
  ).json();

  insertHostRow(newHost);

  createHostForm.reset();
}

function removeHost(id) {
  const result = confirm(`Deseja excluir o host ${id}?`);

  if (result) {
    const tr = document.querySelector(`#host-${id}`);

    tr.remove();

    const config = {
      method: "delete",
    };

    fetch(`http://localhost:3000/hosts/${id}`, config);
  }
}

loadHosts();
