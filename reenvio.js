data =
  "$$H157,013227009650882,AAA,33,-32.722396,-61.865563,230823121840,A,9,15,82,136,1,82,26326520,29159639,722|310|04DA|53D3,0000,0001|0002|0000|0A4B|0883,,,1,0000*7D";

let handler = (data) => {
  {
    if (data[0][0] === "$") {
      return newPackage(data);
    } else console.log("no es un paquete meitrack");
  }
  let newPackageMeitrack = (data) => {
    let divided = data.split(",");
    let newPackage = {};
    newPackage.header = divided[0];
    newPackage.imei = divided[1];
    newPackage.commmandType = divided[2];
    newPackage.eventCode = divided[3];
    newPackage.directionLat = newPackage.lat >= 0 ? "N" : "S";
    newPackage.lat = divided[4];
    newPackage.directionLong = newPackage.long >= 0 ? "E" : "W";
    newPackage.long = divided[5];
    newPackage.dateTime = divided[6];
    newPackage.GPSstatus = divided[7];
    newPackage.NumberOfSats = divided[8];
    newPackage.gsmSingal = divided[9];
    newPackage.speed = divided[10];
    newPackage.direction = divided[11];
    newPackage.presition = divided[12];
    newPackage.altitude = divided[13];
    newPackage.mileage = divided[14];
    newPackage.runTime = divided[15];

    newPackage.GsmInformation = divided[16];
    newPackage.portStatus = divided[17];
    newPackage.AnalogImputs = divided[18];

    let longitud = () => {
      parseFloat(newPackage.long);

      // Obtener los grados y minutos.
      let degrees = Math.floor(Math.abs(newPackage.long));
      let minutes = (Math.abs(newPackage.long) - degrees) * 60;

      // Obtener la dirección (E o W).

      // Devolver la longitud en el formato "DDDMM.MMMM".
      return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
    };
    let latitud = () => {
      // Convertir la latitud a un número decimal.
      lat = parseFloat(newPackage.lat);

      // Obtener los grados y minutos.
      let degrees = Math.floor(Math.abs(newPackage.lat));
      let minutes = (Math.abs(newPackage.lat) - degrees) * 60;

      // Devolver la latitud en el formato "DDFF.FFFF".
      return `${degrees.toString().padStart(2, "0")}${minutes
        .toFixed(4)
        .padStart(7, "0")}`;
    };
    let fecha = () => {
      yy = newPackage.dateTime.substring(0, 2);
      mm = newPackage.dateTime.substring(2, 4);
      dd = newPackage.dateTime.substring(4, 6);
      return `${dd}${mm}${yy}`;
    };
    let accStatus = () => {
      if (newPackage.portStatus === "0000") {
        return "FFFFBBFF";
      } else {
        return "FFFFFFFF";
      }
    };
    let St901Package = () => {
      let SendPackage = [
        "*HQ",
        newPackage.imei,
        "V1",
        newPackage.dateTime.substring(6, 12),
        newPackage.GPSstatus,
        latitud(data),
        (DireccionLat = newPackage.directionLat),
        longitud(data),
        (DireccionLong = newPackage.directionLong),
        (Velocidad = newPackage.speed / 1.852),
        (rumbo = newPackage.direction),
        fecha(data),
        accStatus(), // Reemplazar "FFFFBBFF" por el estado del ACC
        "722",
        "310",
        "06211",
        "15036#",
      ];
      return SendPackage.join(",");
    };

    let send = St901Package(data);
    console.log(send);
    console.log(newPackage);
  };
};

handler(data);
