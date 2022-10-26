const hosts = [
  {
    id: 1,
    name: 'Google DNS',
    address: '8.8.8.8',
  },
  {
    id: 2,
    name: 'Google Search',
    address: 'www.google.com',
  },
];

function readAll() {
  return hosts;
}

export default {
  readAll,
};
