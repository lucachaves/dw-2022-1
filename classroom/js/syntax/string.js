// String ', ", `
const hostname = 'DSK01LB03-JP';
console.log(hostname);

// Concat
const address = '10.0.4.64';

console.log('Hostname: ' + hostname + '\nIP: ' + address);

// Template literals (Template strings)
// multi-line strings
// string interpolation
const hostInfo = `Hostname: ${hostname}
IP: ${address}`;

console.log(hostInfo);

// Array of characthers
console.log(hostInfo[0]);

// Object String
console.log(hostInfo.includes('IP'));

// regex
const newLinePattern = /\n/g;
console.log(hostInfo.match(newLinePattern));

// pad
const lab = '3'.padStart(3, '0');
const desktop = '1'.padStart(3, '0');
console.log(`DSK${desktop}LB${lab}`);

// split / Array.join
const name = 'Luiz Chaves';
console.log(name.split(' '));
