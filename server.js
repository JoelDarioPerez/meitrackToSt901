const net = require("net");

const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  socket.on("data", (data) => {
    const receivedData = data.toString("hex");
    console.log("Paquete recibido:", receivedData);
  });

  socket.on("end", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
