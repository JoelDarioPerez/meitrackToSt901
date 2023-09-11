const net = require("net");

// La función acc para procesar los paquetes
let acc = (data) => {
  let dataArr = data.split(",");
  let dataObj = {};
  dataObj.imei = dataArr[1];
  dataObj.ports = dataArr[17];
  dataObj.time = dataArr[6];
  console.log(dataObj);
};

// Crear un servidor TCP en el puerto 5555
const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  // Escuchar datos del cliente
  socket.on("data", (data) => {
    // Convertir los datos recibidos en una cadena y llamar a la función acc
    const packetData = data.toString();
    acc(packetData);
  });

  // Manejar la desconexión del cliente
  socket.on("end", () => {
    console.log("Cliente desconectado");
  });

  // Manejar errores de conexión
  socket.on("error", (err) => {
    console.error("Error de conexión:", err);
  });
});

// Escuchar en el puerto 5555
const PORT = 5555;
server.listen(PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});
