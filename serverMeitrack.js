const net = require("net");

function parseMeitrackPackage(packageData) {
  const fields = packageData.toString("utf8").split(",");

  const obj = {
    header: fields[0],
    imei: fields[1],
    messageType: fields[2],
    satellites: parseInt(fields[3]),
    latitude: parseFloat(fields[4]),
    longitude: parseFloat(fields[5]),
    dateTime: fields[6],
    deviceStatus: fields[7],
    speed: parseInt(fields[8]),
    azimuth: parseInt(fields[9]),
    altitude: parseInt(fields[10]),
    batteryLevel: parseInt(fields[11]),
    signalGSM: parseInt(fields[12]),
    mcc: parseInt(fields[13]),
    mnc: parseInt(fields[14]),
    lac: fields[15].split("|")[0],
    cellId: fields[15].split("|")[1],
    reserved: fields[15].split("|")[2],
    analogInputs: fields[16].split("|")[0],
    reserved2: fields[16].split("|")[1],
    events: fields[16].split("|")[2],
    reserved3: fields[16].split("|")[3],
    inputStatus: fields[17],
    checksum: fields[18],
  };

  return obj;
}

function packageToString(packageData) {
  // Convierte el paquete (buffer) a un string
  const packageString = packageData.toString("utf8");
  return packageString;
}

function startsWithPackage(packageData) {
  // Convierte el buffer a un string utilizando la codificación UTF-8
  const packageString = packageData.toString("utf8");

  // Verifica si el string comienza con "$$"
  return packageString.indexOf("$$") === 0;
}

function newPackage(parsedPackage) {
  // Aquí debes implementar la lógica para modificar el paquete según tus necesidades
  // ...

  // Ejemplo: Solo cambiaremos el IMEI para este caso
  if (parsedPackage.imei === "013227009650882") {
    parsedPackage.imei = "013226004207938";
  }

  // ...

  // Devolver el paquete modificado
  return `${parsedPackage.header},${parsedPackage.imei},${parsedPackage.messageType},...`;
}

function sendModifiedPackage(modifiedPackage, host, port) {
  const client = new net.Socket();

  client.connect(port, host, () => {
    console.log(
      `Conexión establecida, enviando paquete modificado a ${host}:${port}`
    );
    client.write(modifiedPackage);
  });

  client.on("data", (data) => {
    console.log(`Respuesta del servidor remoto: ${data}`);
    client.destroy(); // Cierra la conexión después de recibir la respuesta
  });

  client.on("error", (err) => {
    console.error("Error al enviar el paquete:", err);
    client.destroy(); // Cierra la conexión en caso de error
  });

  client.on("close", () => {
    console.log("Conexión cerrada");
  });

  function handlePackage(packageData) {
    if (startsWithPackage(packageData)) {
      const parsedPackage = parseMeitrackPackage(packageData);
      const packageString = packageData.toString("utf8");
      console.log(packageString);
    } else {
      console.log(packageData);
    }
  }

  function handleClient(clientSocket) {
    clientSocket.on("data", (data) => {
      handlePackage(data);
      clientSocket.end(); // Cierra la conexión después de procesar el paquete
    });

    clientSocket.on("end", () => {
      console.log("Cliente desconectado");
    });
  }

  function startServer(host, port) {
    const server = net.createServer(handleClient);

    server.listen(port, host, () => {
      console.log(`Servidor escuchando en ${host}:${port}`);
    });
  }

  startServer(host, port); // Llamada a la función startServer dentro de sendModifiedPackage
}

const host = "hwc9760.gpsog.com"; // Puedes cambiar esto por la dirección IP de tu servidor
const port = 9760; // Puedes cambiar esto por el puerto que desees usar

// Aquí debes definir el paquete recibido del GPS que quieres modificar
const gpsPackage = data; // Completa con el contenido del paquete recibido del GPS

// Obtener el paquete modificado utilizando la función newPackage
const modifiedPackage = newPackage(parseMeitrackPackage(gpsPackage));

// Llamar a sendModifiedPackage con los valores adecuados
sendModifiedPackage(modifiedPackage, host, port);
