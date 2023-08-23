/* function parseST908Package(packageData) {
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
 */

const net = require("net");

const server = net.createServer((socket) => {
  let buffer = Buffer.alloc(0);

  socket.on("data", (data) => {
    buffer = Buffer.concat([buffer, data]);

    while (buffer.length >= 16) {
      const header = buffer.readUInt16BE(0);
      const command = buffer.readUInt8(2);
      const packageLength = buffer.readUInt16BE(3);
      const terminalID = buffer.readUInt32BE(5);
      const parameterLength = packageLength - 11;
      const parameters = buffer.slice(9, 9 + parameterLength);
      const checkCode = buffer.readUInt8(9 + parameterLength);
      const trailer = buffer.readUInt8(10 + parameterLength);

      console.log("Package received:");
      console.log("Header:", header.toString(16));
      console.log("Command:", command);
      console.log("Package Length:", packageLength);
      console.log("Terminal ID:", terminalID);
      console.log("Parameters:", parameters);
      console.log("Check Code:", checkCode);
      console.log("Trailer:", trailer.toString(16));

      // Parsing Location Data
      const longitude = parameters.readFloatBE(0);
      const latitude = parameters.readFloatBE(4);
      const altitude = parameters.readFloatBE(8);
      const speed = parameters.readFloatBE(12);

      console.log("Location Data:");
      console.log("Longitude:", longitude);
      console.log("Latitude:", latitude);
      console.log("Altitude:", altitude);
      console.log("Speed:", speed);

      buffer = buffer.slice(packageLength);
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`TCP/IP server listening on port ${PORT}`);
});
