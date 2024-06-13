import { createServer, Socket } from "net";
import handler from "./reenvio.js";

const server = createServer((socket) => {
  console.log("Cliente conectado");

  socket.on("data", (data) => {
    console.log("Datos recibidos:", data.toString());
    let envio = data.toString();
    const result = handler(envio);

    const client = new Socket();
    client.connect(9760, "hwc9760.gpsog.com", () => {
      console.log("Conectado a hwc9996.iopgps.com:9996");
      client.write(result); // Usar client.write para enviar datos al servidor remoto
    });

    client.on("close", () => {
      console.log("Conexión al servidor remoto cerrada");
    });

    client.on("error", (err) => {
      console.error("Error en la conexión al servidor remoto:", err);
    });
  });

  socket.on("end", () => {
    console.log("Cliente desconectado");
  });

  socket.on("error", (err) => {
    console.error("Error en la conexión:", err);
  });
});

server.listen(9700, () => {
  console.log("Servidor TCP escuchando en el puerto 9700");
});

