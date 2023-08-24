const net = require("net");
const fs = require("fs");

const server = net.createServer((socket) => {
  console.log("Cliente conectado.");

  const pipePath = "\\\\.\\pipe\\mypipe"; // Ruta del pipe
  const pipeStream = fs.createWriteStream(pipePath);

  const destinationHost = "45.112.204.217";
  const destinationPort = 7000;
  const destinationSocket = new net.Socket();

  destinationSocket.connect(destinationPort, destinationHost, () => {
    console.log("Conexión con el destino establecida.");
  });

  destinationSocket.on("data", (data) => {
    console.log(`Respuesta del destino: ${data}`);
  });

  destinationSocket.on("end", () => {
    console.log("Conexión con el destino finalizada.");
  });

  socket.on("data", (data) => {
    const hexData = data.toString("hex").toUpperCase();
    console.log(`Paquete recibido: ${hexData}`);

    // Enviar el paquete al destino a través del socket TCP
    destinationSocket.write(data);

    // Escribir el paquete en el pipe
    pipeStream.write(hexData, (err) => {
      if (err) {
        console.error("Error al escribir en el pipe:", err);
      } else {
        console.log("Paquete enviado por el pipe.");
      }
    });
  });

  socket.on("end", () => {
    console.log("Cliente desconectado.");
    destinationSocket.end();
    pipeStream.end(); // Finalizar el stream del pipe
  });

  socket.on("error", (error) => {
    console.error("Error en el socket:", error);
    destinationSocket.end();
    pipeStream.end(); // Finalizar el stream del pipe
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor TCP/IP escuchando en el puerto ${PORT}`);
});
