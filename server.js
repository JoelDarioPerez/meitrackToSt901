const net = require('net');

const server = net.createServer(socket => {
  console.log('Cliente conectado.');

  socket.on('data', data => {
    console.log('Datos recibidos en formato HEX:', data.toString('hex'));
  });

  socket.on('end', () => {
    console.log('Cliente desconectado.');
  });

  socket.on('error', err => {
    console.error('Error en la conexión:', err);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});
