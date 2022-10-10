const tbody = document.querySelector("tbody");

let hosts = [];
let myChart;

function insertHostRow({ id, name, address }) {
  const hostRow = `<tr id="host-${id}">
    <td>${name}</td>
    <td>${address}</td>
    <td>
      <i class="fa-solid fa-stopwatch" onclick="loadChartData(${id})"></i>
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

function initChart() {
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  myChart = new Chart(document.getElementById("myChart"), config);
}

async function loadChartData(id) {
  const times = await (
    await fetch(`http://localhost:3000/hosts/${id}/times`)
  ).json();

  const data = times.map((time) => time.time);

  const labels = [...data.keys()];

  myChart.data.labels = labels;

  myChart.data.datasets[0].data = data;

  myChart.update();
}

loadHosts();

initChart();
