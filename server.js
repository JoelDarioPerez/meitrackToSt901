const net = require("net");

const server = net.createServer((socket) => {
  console.log("Cliente conectado.");

  let buffer = Buffer.alloc(0); // Buffer para almacenar los datos entrantes

  socket.on("data", (data) => {
    buffer = Buffer.concat([buffer, data]); // Agregar datos al buffer

    // Verificar si se ha recibido al menos el tamaño del encabezado
    if (buffer.length >= 7) {
      const packageLength = buffer.readUInt16BE(1); // Leer longitud del paquete
      if (buffer.length >= packageLength) {
        const commandWord = buffer.readUInt16BE(3); // Leer palabra de comando
        const terminalID = buffer.readUInt32BE(5); // Leer ID de terminal

        // Aquí puedes realizar las acciones según la palabra de comando y otros datos
        // ...

        // Borrar los datos procesados del buffer
        buffer = buffer.slice(packageLength);
      }
    }
  });

  socket.on("end", () => {
    console.log("Cliente desconectado.");
  });

  socket.on("error", (err) => {
    console.error("Error en la conexión:", err);
  });
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});
