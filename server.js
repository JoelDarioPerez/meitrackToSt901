const net = require('net');

const server = net.createServer(socket => {
  console.log('Cliente conectado.');

  socket.on('data', data => {
    const receivedData = data.toString();
    console.log(`Datos recibidos: ${receivedData}`);

    if (receivedData.startsWith('#')) {
      // Enviar respuesta "LOAD" al cliente
      const response = 'LOAD\r\n';
      socket.write(response, 'utf-8', () => {
        console.log(`Respuesta enviada: ${response}`);
      });
    }
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
