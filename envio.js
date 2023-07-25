// netcatSender.js
const net = require("net");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

function sendViaNetcat(data) {
  const host = process.env.HOST_output;
  const port = process.env.PORT_output;
  const client = net.connect(port, host, () => {
    console.log(`Conectado al servidor: ${host}:${port}`);
    // Enviamos los datos a través del socket del cliente TCP
    client.write(data);
  });

  // Capturamos los datos recibidos del servidor remoto
  client.on("data", (data) => {
    console.log(`Datos recibidos del servidor remoto: ${data}`);
    // Aquí puedes realizar alguna acción con los datos recibidos si lo deseas
  });

  // Capturamos el evento de cierre de la conexión
  client.on("end", () => {
    console.log("Conexión cerrada por el servidor remoto.");
  });

  // Capturamos el evento de error en la conexión
  client.on("error", (err) => {
    console.error(`Error en la conexión al servidor: ${err}`);
  });
}

// Creamos el servidor TCP para recibir los datos del GPS
function gpsTrackerServer(host, port) {
  const server = net.createServer((clientSocket) => {
    console.log(
      `Cliente conectado desde: ${clientSocket.remoteAddress}:${clientSocket.remotePort}`
    );

    clientSocket.on("data", (data) => {
      // Procesamos los datos recibidos y obtenemos la respuesta
      const processedData = newPackage(data.toString());

      console.log(`Datos recibidos: ${data.toString()}`);
      console.log(`Respuesta enviada al cliente: ${processedData}`);

      // Enviamos los datos procesados a través de netcat
      sendViaNetcat(processedData);

      // Ejemplo: procesar los datos recibidos y enviar una respuesta al cliente
      const response = "Datos procesados correctamente";
      clientSocket.write(response);
    });

    clientSocket.on("end", () => {
      console.log("Cliente cerró la conexión.");
    });

    clientSocket.on("error", (err) => {
      console.log(`Error en la conexión del cliente: ${err.message}`);
    });
  });

  server.on("error", (err) => {
    console.log(`Error en el servidor: ${err.message}`);
  });

  server.listen(port, host, () => {
    console.log(`Servidor escuchando en ${host}:${port}`);
  });
}

gpsTrackerServer(host, port);

module.exports = {
  sendViaNetcat,
};
