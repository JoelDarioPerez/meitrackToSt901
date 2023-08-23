const net = require("net");
const https = require("https");
const fs = require("fs");

/* data =
  "$$H157,013227009650882,AAA,33,-32.722396,-61.865563,230823121840,A,9,15,82,136,1,82,26326520,29159639,722|310|04DA|53D3,0000,0001|0002|0000|0A4B|0883,,,1,0000*7D"; */
data =
  "292980002846914885230817143112832545128684558300000000ffff000082fc0000001e780a08000034b20d";

// Función para modificar el paquete recibido
let handlePackage = (data) => {
  try {
    if (data.startsWith("$$")) {
      return newPackageMeitrack(data);
    } else if (data.startsWith("2929")) {
    } else {
      // Manejar otros casos si es necesario
    }
  } catch (error) {
    // Manejar errores aquí
    console.error("Error:", error);
  }
};

const newPackageSt908 = (data) => {
    const divided = data.split("");
  
    function parseST908Packet(packet) {
      const components = {};
  
      // Extracting Time
      const time = packet.substr(0, 12);
      components.time = time;
  
      // Extracting Latitude
      const latitude = packet.substr(12, 4);
      components.latitude = latitude;
  
      // Extracting Longitude
      const longitude = packet.substr(16, 4);
      components.longitude = longitude;
  
      // Extracting Speed and Direction
      const speedDirection = packet.substr(20, 4);
      components.speed = speedDirection.substr(0, 2);
      components.direction = speedDirection.substr(2, 2);
  
      // Extracting GPS Antenna Status
      const gpsAntenna = packet.substr(24, 2);
      components.gpsAntenna = gpsAntenna;
  
      // Extracting Fuel
      const fuel = packet.substr(26, 2);
      components.fuel = fuel;
  
      // Extracting Vehicle State
      const vehicleState = packet.substr(28, 8);
      components.vehicleState = vehicleState;
  
      // Extracting Other State
      const otherState = packet.substr(36, 8);
      components.otherState = otherState;
  
      return components;
    }
  
    // Llamar a la función para parsear el paquete y devolver los componentes
    return parseST908Packet(divided.join(""));
    
    
  };
  
  console.log(newPackageSt908(data));
  

/* // Función para enviar los datos a través de netcat
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

// Ejecutamos la función del servidor
const host = "0.0.0.0"; // Escucha en todas las interfaces
const port = 9700; // Puerto del servidor TCP
gpsTrackerServer(host, port);
 */
