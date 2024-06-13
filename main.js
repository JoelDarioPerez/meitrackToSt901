import handler from "./reenvio.js";

const net = require('net');
const server = net.createServer((socket) => {
  console.log('Cliente conectado');
  
  socket.on('data', (data) => {
    console.log('Datos recibidos:', data.toString());
    const result = handler(data.toString());

    const client = new net.Socket();
    client.connect(9996, 'hwc9996.iopgps.com', () => {
      console.log('Conectado a hwc9996.iopgps.com:9996');
      client.write(result);
      client.end();
    });

    client.on('close', () => {
      console.log('Conexión al servidor remoto cerrada');
    });

    client.on('error', (err) => {
      console.error('Error en la conexión al servidor remoto:', err);
    });
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });

  socket.on('error', (err) => {
    console.error('Error en la conexión:', err);
  });
});

server.listen(9700, () => {
  console.log('Servidor TCP escuchando en el puerto 9700');
});
