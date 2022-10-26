// https://errorsandanswers.com/connecting-to-remote-ssh-server-via-node-js-html5-console/

import ssh2 from 'ssh2';

const SSHClient = ssh2.Client;

export async function loadSocket(io, host) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    const conn = new SSHClient();

    const channel = `data`;

    // const channel = `data${host.id}`;

    conn
      .on('ready', function () {
        console.log(`connection channel ${channel} `);

        socket.emit(channel, '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');

        conn.shell(function (err, stream) {
          if (err)
            return socket.emit(
              channel,
              '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n'
            );
          socket.on(channel, function (data) {
            stream.write(data);
          });
          stream
            .on(channel, function (d) {
              socket.emit(channel, d.toString('binary'));
            })
            .on('close', function () {
              conn.end();
            });
        });
      })
      .on('close', function () {
        socket.emit(channel, '\r\n*** SSH CONNECTION CLOSED ***\r\n');
      })
      .on('error', function (err) {
        socket.emit(
          channel,
          '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n'
        );
      })
      .connect(host);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
