const net = require('net');

const server = net.createServer(socket => {
  console.log('Cliente conectado.');

  socket.on('data', data => {
    const hexData = data.toString('hex');
    console.log(`Datos recibidos en formato hexadecimal: ${hexData}`);
  });

  socket.on('end', () => {
    console.log('Cliente desconectado.');
  });

  socket.on('error', error => {
    console.error(`Error: ${error}`);
  });
});

const port = 8000;

server.listen(port, () => {
  console.log(`Servidor TCP/IP escuchando en el puerto ${port}`);
});
