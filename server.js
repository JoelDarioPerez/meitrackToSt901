const net = require('net');

// Dirección IP y puerto del servidor al que reenviar los datos
const remoteServerHost = 'hwc9760.gpsog.com';
const remoteServerPort = 9760;

const server = net.createServer(socket => {
  console.log('Cliente conectado.');

  // Crear una conexión con el servidor remoto
  const remoteSocket = net.createConnection(remoteServerPort, remoteServerHost, () => {
    console.log('Conectado al servidor remoto.');
  });

  socket.on('data', data => {
    const decodedData = data.toString();
    console.log(`Datos recibidos: ${decodedData}`);

    // Reenviar los datos al servidor remoto
    remoteSocket.write(data);
  });

  socket.on('end', () => {
    console.log('Cliente desconectado.');

    // Cerrar la conexión con el servidor remoto cuando el cliente se desconecta
    remoteSocket.end();
  });

  socket.on('error', error => {
    console.error(`Error: ${error}`);
  });
});

const port = 8000;

server.listen(port, () => {
  console.log(`Servidor TCP/IP escuchando en el puerto ${port}`);
});
