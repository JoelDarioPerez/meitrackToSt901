const net = require('net');

const server = net.createServer(socket => {
  console.log('Cliente conectado.');

  socket.on('data', data => {
    const hexData = data.toString('hex').toUpperCase();
    console.log(`Paquete recibido: ${hexData}`);
  });

  socket.on('end', () => {
    console.log('Cliente desconectado.');
  });

  socket.on('error', error => {
    console.error('Error en el socket:', error);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor TCP/IP escuchando en el puerto ${PORT}`);
});
