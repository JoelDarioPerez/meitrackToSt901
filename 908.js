let data =
  "292980002846914885230906170530833051548682827800000093ffff000002fc0000001e78081b000034d80d";

let whdProtocol = (data) => {
  let package = {};

  package.header = data.slice(0, 4);
  package.command = data.slice(4, 6);
  package.length = data.slice(6, 10);
  package.id = data.slice(10, 18).padStart(12, 0); // Adjusted the length to 15 characters
  package.day = data.slice(22, 24);
  package.month = data.slice(20, 22);
  package.year = data.slice(18, 20);
  package.time = data.slice(24, 30);

  let latitud = () => {
    let latitud = data.slice(31, 38); // La latitud viene en este formato GGMMSS
    let grados = parseFloat(data.slice(31, 33));
    let minutos = parseFloat(data.slice(33, 35));
    let cents = (parseFloat(data.slice(35, 37)) / 3600).toFixed(4);
    return `${grados}${minutos + cents}`;
  };
  package.latitude = latitud(data);
  

  let longitud = () => {
   let longitud = data.slice(39, 46); // La longitud viene en este formato GGMMSS
    let grados =  parseFloat(data.slice(39, 41));
    let milesimas = (((parseFloat(data.slice(41, 46))) / 60).toString).padStart(2,"0");
      console.log(longitud);
      console.log(`${grados}${(milesimas/60000).toFixed(4)}`);
    return `${longitud}`;
  };

  package.longitude = longitud(data);

  let speed = () => {
    let kmh = parseFloat(data.slice(46, 48)) / 1.852;
    return kmh.toFixed(2);
  };
  package.speed = speed(data);

  package.course = data.slice(48, 50);
  package.gpsAntenna = data.slice(62, 64);
  package.fuel = data.slice(64, 70);
  package.state = data.slice(70, 78);
  package.otherState = data.slice(78, 94);

  let St901Package = (package) => {
    let SendPackage = [
      "*HQ",
      package.id,
      "V1",
      package.time,
      "A",
      package.latitude,
      "S",
      package.longitude,
      "W",
      package.speed,
      package.course,
      package.day + package.month + package.year, // Adjusted the order for date
      "FFFFBBFF", // Reemplazar "FFFFBBFF" por el estado del ACC
      "722",
      "310",
      "06211",
      "15036#",
    ];
    console.log(package);
    return SendPackage.join(",");
  };
  let newPackage = St901Package(package);
  console.log(newPackage);
};

whdProtocol(data);
