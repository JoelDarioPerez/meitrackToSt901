function parsePackage(package) {
  const header = package.substring(0, 4);
  const command = package.substring(4, 8);
  const packageLength = package.substring(8, 10);
  const terminalID = package.substring(10, 18);
  const date = package.substring(18, 24);
  const time = package.substring(24, 30);

  const latitudeOrientation = package.substring(30, 31);
  const latitudeValue = package.substring(31, 38);
  const longitudeOrientation = package.substring(38, 39);
  const longitudeValue = package.substring(39, 46);
  const speed = package.substring(46, 50);
  const direction = package.substring(50, 53);
  const gpsAntenna = package.substring(53, 54);
  const fuel = package.substring(50, 54);
  const vehicleState = package.substring(67, 75);
  const checkCode = package.substring(75, 77);
  const packageTrailer = package.substring(77);

  return {
    header,
    command,
    packageLength,
    terminalID,
    date,
    time,
    latitudeOrientation,
    latitudeValue,
    longitudeOrientation,
    longitudeValue,
    speed,
    direction,
    gpsAntenna,
    fuel,
    vehicleState,
    checkCode,
    packageTrailer,
  };
}

const receivedPackage =
  "292980002846914885230824135438832540898681954100000184ffff000002fc0000001e780b0a00003456";
const parsedData = parsePackage(receivedPackage);
console.log(parsedData);
