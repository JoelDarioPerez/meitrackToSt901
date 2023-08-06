const net = require("net");
const { spawn } = require("child_process");

const packageData =
  "$$X156,013227008013553,AAA,31,-32.872680,-68.771830,230804171923,A,7,26,0,81,1,684,12394194,31269673,722|310|1849|89D3,0200,0005|0005|0000|0964|0000,,,1,0000*2A";

function parseMeitrackPackage(packageData) {
  const fields = packageData.split(",");

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
let newPackage = (parsedPackage) => {
  if (parsedPackage.imei === "013227009650882") {
    parsedPackage.imei = "013226004207938";
  }

  function time(dateTime) {
    let hora = "";
    for (let i = 6; i < dateTime.length; i++) {
      hora += dateTime[i];
    }
    return hora;
  }

  let DireccionLat = parsedPackage.latitude >= 0 ? "N" : "S";
  let DireccionLong = parsedPackage.longitude >= 0 ? "E" : "W";

  function convertLatitude(parsedPackage) {
    // Convertir la latitud a un número decimal.
    let lat = parseFloat(parsedPackage.latitude);

    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(lat));
    let minutes = (Math.abs(lat) - degrees) * 60;

    // Devolver la latitud en el formato "DDFF.FFFF".
    return `${degrees.toString().padStart(2, "0")}${minutes
      .toFixed(4)
      .padStart(7, "0")}${DireccionLat}`;
  }

  function convertLongitude(parsedPackage) {
    // Convertir la longitud a un número decimal.
    let long = parseFloat(parsedPackage.longitude);

    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(long));
    let minutes = (Math.abs(long) - degrees) * 60;

    // Devolver la longitud en el formato "DDDMM.MMMM".
    return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
  }

  function convertKmHToKnots(parsedPackage) {
    // Convertir km/h a nudos.
    let knots = parsedPackage.speed / 1.852;

    // Redondear a 4 decimales.
    let roundedKnots = knots.toFixed(2);

    // Asegurar que la velocidad tenga siempre 3 dígitos.
    return roundedKnots.padStart(3, "0");
  }

  function date(parsedPackage) {
    return (
      parsedPackage.dateTime.slice(4) +
      parsedPackage.dateTime.slice(2, 4) +
      parsedPackage.dateTime.slice(0, 2)
    );
  }

  function countActiveInputs(inputStatus) {
    const binaryStatus = parseInt(inputStatus, 16)
      .toString(2)
      .padStart(16, "0");
    let count = 0;
    for (let i = 0; i < binaryStatus.length; i++) {
      if (binaryStatus[i] === "1") {
        count++;
      }
    }
    return count;
  }

  function analyzeMeitrackInputs(parsedPackage) {
    const activeInputs = countActiveInputs(parsedPackage.inputStatus);
    if (activeInputs === 0) {
      return "FFFFBFFF"; // Bateria desconectada
    } else if (activeInputs === 2) {
      return "FFFF9DFF"; // Acc on
    } else if (activeInputs === 1) {
      return "FFFF9FFF"; // Otro estado, debes definirlo aquí según la descripción previa
    }
  }

  let SendPackage = [
    "*HQ",
    parsedPackage.imei,
    "V1",
    time(parsedPackage.dateTime),
    parsedPackage.deviceStatus,
    convertLatitude(parsedPackage),
    DireccionLat,
    convertLongitude(parsedPackage),
    DireccionLong,
    convertKmHToKnots(parsedPackage),
    parsedPackage.azimuth,
    date(parsedPackage),
    analyzeMeitrackInputs(parsedPackage),
    "722",
    "310",
    "06211",
    "15036#",
  ];
  return SendPackage.join(",");
};
function sendModifiedPackage(modifiedPackage) {
  const serverAddress = "hwc9760.gpsog.com";
  const serverPort = 9760;

  const nc = spawn("nc", [serverAddress, serverPort]);
  nc.stdin.write(modifiedPackage);
  nc.stdin.end();

  nc.stdout.on("data", (data) => {
    console.log(`Respuesta del servidor: ${data}`);
  });

  nc.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  nc.on("close", (code) => {
    console.log(`Conexión cerrada con código ${code}`);
  });
}

function handlePackage(packageData) {
  if (typeof packageData === "string" && packageData.startsWith("$$")) {
    const parsedPackage = parseMeitrackPackage(packageData);
    console.log(newPackage(parsedPackage));
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

const host = "0.0.0.0"; // Puedes cambiar esto por la dirección IP de tu servidor
const port = 9700; // Puedes cambiar esto por el puerto que desees usar
startServer(host, port);
