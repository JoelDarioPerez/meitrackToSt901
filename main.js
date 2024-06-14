import { createServer, Socket } from "net";
import handler from "./reenvio.js";

const server = createServer((socket) => {
  console.log("Cliente conectado");

  socket.on("data", (data) => {
    console.log("Datos recibidos:", data.toString());
    let envio = data.toString();
    const result = handler(envio);
let ip = "hwc9760.iopgps.com";
let port = "9760"
    const client = new Socket();
    client.connect(port, ip, () => {
      console.log(`Conectado a ${ip}:${port}`);
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

