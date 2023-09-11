let handler = (data) => {
  if (data[0] === "$") {
    newPackage(data);
  } else {
    console.log("No es un paquete Meitrack");
  }

  function newPackage(data) {
    let divided = data.split(",");
    let newPackage = {};
    newPackage.header = divided[0];
    newPackage.imei = divided[1];
    newPackage.commmandType = divided[2];
    newPackage.eventCode = divided[3];
    newPackage.lat = parseFloat(divided[4]);
    newPackage.directionLat = newPackage.lat >= 0 ? "N" : "S";
    newPackage.long = parseFloat(divided[5]);
    newPackage.directionLong = newPackage.long >= 0 ? "E" : "W";
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

    function longitud() {
      // Obtener los grados y minutos.
      let degrees = Math.floor(Math.abs(newPackage.long));
      let minutes = (Math.abs(newPackage.long) - degrees) * 60;
      return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
    }

    function latitud() {
      // Obtener los grados y minutos.
      let degrees = Math.floor(Math.abs(newPackage.lat));
      let minutes = (Math.abs(newPackage.lat) - degrees) * 60;
      return `${degrees.toString().padStart(2, "0")}${minutes
        .toFixed(4)
        .padStart(7, "0")}`;
    }

    function fecha() {
      let yy = newPackage.dateTime.substring(0, 2);
      let mm = newPackage.dateTime.substring(2, 4);
      let dd = newPackage.dateTime.substring(4, 6);
      return `${dd}${mm}${yy}`;
    }

    function accStatus() {
      let portStatus = parseInt(newPackage.portStatus, 16);
      if (portStatus === 0) {
        return "FFFFBBFF";
      } else {
        return "FFFFFFFF";
      }
    }

    function St901Package() {
      let SendPackage = [
        "*HQ",
        newPackage.imei,
        "V1",
        newPackage.dateTime.substring(6, 12),
        newPackage.GPSstatus,
        latitud(),
        newPackage.directionLat,
        longitud(),
        newPackage.directionLong,
        newPackage.speed / 1.852,
        newPackage.direction,
        fecha(),
        accStatus(),
        "722",
        "310",
        "06211",
        "15036#",
      ];
      return SendPackage.join(",");
    }

    let send = St901Package();
    console.log(send);
  }
};


handler(data);
