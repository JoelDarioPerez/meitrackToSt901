function modificadorMeitrack(data) {
  const dataSplit = data.split(",");
  const datosMeitrack = {
    header: dataSplit[0],
    imei: dataSplit[1],
    dataIdentifier: dataSplit[2],
    length: dataSplit[3],
    latitude: parseFloat(dataSplit[4]), // Convertimos a número aquí
    longitude: parseFloat(dataSplit[5]), // Convertimos a número aquí
    date: dataSplit[6],
    status: dataSplit[7],
    satellites: dataSplit[8],
    gsmSignal: dataSplit[9],
    speed: parseFloat(dataSplit[10]),
    direction: dataSplit[11],
    horizontalAccuracy: dataSplit[12],
    altitude: dataSplit[13],
    mileage: dataSplit[14],
    runtime: dataSplit[15],
    baseStationInfo: dataSplit[16],
    ioPortStatus: dataSplit[17],
    analogInputValue: dataSplit[18],
    rfidPictureFenceTempSensor: dataSplit[19],
    customizedData: dataSplit[20],
    protocolVersion: dataSplit[21],
    fuelPercentage: dataSplit[22],
    tempSensorValues: dataSplit[23],
  };

  function convertirLatitud(latitud) {
    let direccion = latitud >= 0 ? "N" : "S";
    let gradosAbs = Math.abs(latitud);
    let grados = Math.floor(gradosAbs);
    let minutos = (gradosAbs - grados) * 60;
    let gradosStr = String(grados).padStart(2, "0");
    let minutosStr = minutos.toFixed(4).padStart(7, "0");
    return `${gradosStr}${minutosStr},${direccion}`;
  }

  function convertirLongitud(longitud) {
    let direccion = longitud >= 0 ? "E" : "W";
    let gradosAbs = Math.abs(longitud);
    let grados = Math.floor(gradosAbs);
    let minutos = (gradosAbs - grados) * 60;
    let gradosStr = String(grados).padStart(3, "0");
    let minutosStr = minutos.toFixed(4).padStart(7, "0");
    return `${gradosStr}${minutosStr},${direccion}`;
  }

  function convertirIoPortStatus(ioPortStatus) {
    let binaryRepresentation = "";
    for (let i = 0; i < ioPortStatus.length; i += 2) {
      let byte = ioPortStatus.substr(i, 2);
      let binaryByte = parseInt(byte, 16).toString(2).padStart(8, "0");
      binaryRepresentation += binaryByte;
    }
    if ((ioPortStatus[5] = "1")) {
      datosMeitrack.Acc = "FFFF9FFF";
    } else if ((ioPortStatus[5] = "0")) {
      datosMeitrack.Acc = "FFFFBBFF";
    } else if ((ioPortStatus[4] = "1")) {
      datosMeitrack.Acc = "FFFF9FFF";
    } else "FFFFBBFF";
    return binaryRepresentation;
  }

  function formatearFecha(fecha) {
    let year = fecha.slice(0, 2);
    let day = fecha.slice(2, 4);
    let month = fecha.slice(4, 6);
    let hour = fecha.slice(6, 8);
    let minute = fecha.slice(8, 10);
    let second = fecha.slice(10, 12);
    return {
      fechaFormateada: `${day}${month}${year}`,
      horaFormateada: `${hour}${minute}${second}`,
    };
  }

  datosMeitrack.formattedLatitude = convertirLatitud(datosMeitrack.latitude);
  datosMeitrack.formattedLongitude = convertirLongitud(datosMeitrack.longitude);
  datosMeitrack.ioPortStatusBinary = convertirIoPortStatus(
    datosMeitrack.ioPortStatus
  );
  function convertKmhToKnots(speedKmh) {
    const speedKnots = speedKmh / 1.852;
    return speedKnots.toFixed(2).padStart(6, "0");
  }
  datosMeitrack.velocidad = convertKmhToKnots(datosMeitrack.speed);
  const fechaFormateada = formatearFecha(datosMeitrack.date);
  datosMeitrack.fecha = fechaFormateada.fechaFormateada;
  datosMeitrack.hora = fechaFormateada.horaFormateada;
  function paqueteAutoleaders() {
    let header = "*HQ";
    let imei = datosMeitrack.imei;
    let version = "V1";
    let date = datosMeitrack.hora;
    let isValid = datosMeitrack.status;
    let latitud = datosMeitrack.formattedLatitude;
    let longitud = datosMeitrack.formattedLongitude;
    let speed = datosMeitrack.velocidad;
    let direction = datosMeitrack.direction.padStart(3, "0");
    let fecha = datosMeitrack.fecha;
    let acccStatus = datosMeitrack.Acc;
    let antena = "722,310,06217,35038#";

    let paqueteFormateado = `${header},${imei},${version},${date},${isValid},${latitud},${longitud},${speed},${direction},${fecha},${acccStatus},${antena}`;
    return paqueteFormateado;
  }
  console.log(paqueteAutoleaders());
  return paqueteAutoleaders();
}
export function handler(data) {
  if (data.startsWith("$$")) {
    modificadorMeitrack(data);
  } else console.log("No es un mensaje Meitrack:", data);
}

export default handler


