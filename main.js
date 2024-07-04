import { createServer, Socket } from "net";
import handler from "./reenvio.js";
import { configDotenv } from "dotenv";

configDotenv();

const server = createServer((socket) => {
  console.log("Cliente conectado");

  socket.on("data", (data) => {
    console.log("Datos recibidos:", data.toString()); // Mostrar datos recibidos
    let envio = data.toString();
    const result = handler(envio);
    let ip = process.env.REMOTE_IP;
    let port = process.env.REMOTE_PORT;

    if (!ip || !port) {
      console.error("REMOTE_IP o REMOTE_PORT no están configurados.");
      return;
    }

    const client = new Socket();
    client.connect(port, ip, () => {
      client.write(result);
      console.log(`Conectado a ${ip}:${port}`);
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
