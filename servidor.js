// Función para enviar los datos a través de netcat
function sendViaNetcat(data) {
  const host = "hwc9760.gpsog.com";
  const port = 9760;

  // Creamos el cliente TCP
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
      ;

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

// Ejecutamos la función del servidor
const host = "0.0.0.0"; // Escucha en todas las interfaces
const port = 9700; // Puerto del servidor TCP
gpsTrackerServer(host, port);
