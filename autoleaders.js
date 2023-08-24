function parseGPSData(packet) {
  const header = packet.slice(0, 4);
  const command = packet.slice(4, 6);
  const packageLength = packet.slice(6, 10);
  const terminalID = packet.slice(10, 18);

  // Detalle de los parámetros
  const time = packet.slice(18, 30);
  const latitude = packet.slice(30, 38);
  const longitude = packet.slice(38, 46);
  const speedDirection = packet.slice(46, 50);
  const gpsAntenna = packet.slice(49, 50);
  const fuel = packet.slice(46, 52);
  const vehicleState = packet.slice(52, 56);

  const verificationCode = packet.slice(packet.length - 10, packet.length - 8);
  const trailer = packet.slice(packet.length - 8);

  return {
    header,
    command,
    packageLength,
    terminalID,
    params: {
      time,
      latitude,
      longitude,
      speedDirection,
      gpsAntenna,
      fuel,
      vehicleState,
    },
    verificationCode,
    trailer,
  };
}

// Ejemplo de uso
const receivedPacket =
  "292980002846914885230817143212832545118684558300000000ffff000082fc0000001e780a08000034b20d";
const parsedData = parseGPSData(receivedPacket);
console.log(parsedData);
