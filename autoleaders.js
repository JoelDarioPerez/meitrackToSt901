function parseST908Package(packageData) {
  const obj = {};

  // ID del terminal (4 bytes)
  obj.terminalId = parseInt(packageData.substr(10, 8));

  // Latitud (4 bytes)
  obj.latitude = parseFloat(packageData.substr(31, 7));

  // Longitud (4 bytes)
  obj.longitude = parseFloat(packageData.substr(39, 7));

  obj.time = parseInt(packageData.substr(18, 12));

  // Velocidad (2 bytes)
  obj.speed = parseInt(packageData.substr(50, 4));

  // Dirección (2 bytes)
  obj.direction = parseInt(packageData.substr(52, 3));
  obj.acc = parseInt(packageData.substr(76, 8), 8);
  // Estado del ACC y Estado de la batería (1 byte)
  const vehicleState = parseInt(packageData.substr(54, 2), 16);
  obj.accStatus = (vehicleState & 0b00000001) === 0 ? "Apagado" : "Encendido";
  obj.batteryStatus = (vehicleState & 0b00000010) === 0 ? "Normal" : "Activada";

  return obj;
}

const packageData =
  "292980002846914885230817143542832545138684558300000000ffff000082fc0000001e780a08000034e70d";
const parsedData = parseST908Package(packageData);
console.log(parsedData);
