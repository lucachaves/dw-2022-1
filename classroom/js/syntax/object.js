// class declaration
class Host {
  #hostname;
  #address;

  constructor(hostname, address) {
    this.#hostname = hostname;
    this.#address = address;
  }

  get hostname() {
    return this.#hostname;
  }

  set hostname(hostname) {
    this.#hostname = hostname;
  }

  toString() {
    return `Hostname: ${this.#hostname}\nIP: ${this.#address}`;
  }
}

const desktop = new Host('DSK01LB3-JP', '10.0.4.64');

console.log(desktop);
// Host {#hostname: 'DSK01LB3-JP', #address: '10.0.4.64'}

console.log(desktop.hostname);
desktop.hostname = 'DSK01LB03-JP';
console.log(desktop.hostname);

console.log(desktop.toString());

// console.log(desktop.address);
// desktop.address = '10.0.4.65';
// console.log(desktop.address);

// prototype
Host.prototype.hello = () => {
  return 'Hello';
};

console.log(desktop.hello());

// JSON - JavaScript Object Notation
// const host = ['DSK01LB3-JP', '10.0.4.64'];
// console.log(host[0]);
// console.log(host[1]);

const host = {
  hostname: 'DSK01LB03-JP',
  addresss: '10.0.4.64',
};
console.log(host.hostname);
console.log(host.addresss);

// const hosts = [
//   ['DSK01LB03-JP', '10.0.4.64'],
//   ['DSK02LB03-JP', '10.0.4.65'],
// ];

const hosts = [
  {
    hostname: 'DSK01LB03-JP',
    addresss: '10.0.4.64',
  },
  {
    hostname: 'DSK02LB03-JP',
    addresss: '10.0.4.65',
  },
];

console.log(hosts[1].addresss);

// JSON.stringify
const hostsString = JSON.stringify(hosts);
console.log(hostsString);

// JSON.parse
console.log(JSON.parse(hostsString));
