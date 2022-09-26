const tbody = document.querySelector("tbody");

const hosts = [
  {
    name: "Google DNS",
    address: "8.8.8.8",
  },
  {
    name: "Google Search",
    address: "www.google.com",
  },
  {
    name: "IFPB",
    address: "wwww.ifpb.edu.br",
  },
];

function insertHostRow(name, address) {
  const hostRow = `<tr>
    <td>${name}</td>
    <td>${address}</td>
    <td>
      <i class="fa-solid fa-stopwatch"></i>
      <i class="ms-3 fa-solid fa-trash-can"></i>
    </td>
  </tr>`;

  tbody.insertAdjacentHTML("beforeend", hostRow);
}

function loadHosts() {
  hosts.map((host) => insertHostRow(host.name, host.address));
}

function handleSubmit(event) {
  event.preventDefault();

  const [name, address] = document.querySelectorAll("input");

  insertHostRow(name.value, address.value);

  createHostForm.reset();
}

loadHosts();
