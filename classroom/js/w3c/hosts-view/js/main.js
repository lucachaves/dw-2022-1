const hosts = [
  {
    name: 'Google DNS',
    address: '8.8.8.8',
  },
  {
    name: 'Google Search',
    address: 'www.google.com',
  },
  {
    name: 'IFPB',
    address: 'wwww.ifpb.edu.br',
  },
];

function getHostRow(host) {
  return `<tr>
    <td>${host.name}</td>
    <td>${host.address}</td>
    <td>
      <i class="fa-solid fa-stopwatch"></i>
      <i class="ms-3 fa-solid fa-trash-can"></i>
    </td>
  </tr>`;
}

const hostRows = hosts.map((host) => getHostRow(host)).join('');

const tbody = document.querySelector('tbody');

tbody.innerHTML = hostRows;
