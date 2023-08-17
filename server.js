const net = require('net');

const server = net.createServer(socket => {
  console.log('Cliente conectado.');

  let buffer = Buffer.alloc(0); // Buffer para almacenar los datos entrantes

  socket.on('data', data => {
    buffer = Buffer.concat([buffer, data]); // Agregar datos al buffer

    // Verificar si se ha recibido al menos 512 bytes
    if (buffer.length >= 512) {
      const receivedData = buffer.slice(0, 512);

      console.log('Datos completos recibidos en formato HEX:', receivedData.toString('hex'));

      // Borrar los datos procesados del buffer
      buffer = buffer.slice(512);
    }
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
