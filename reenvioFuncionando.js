const net = require("net");
const https = require("https");
const fs = require("fs");
require("dotenv").config();
data =
  "$$n157,013227009650882,AAA,33,-33.179850,-60.516771,230825100450,A,6,18,88,138,1,33,27462664,29321128,722|310|0C64|81C6,0000,0001|0000|0000|0A45|087D,,,1,0000*91/*";
newPackage = (data) => {
  // Aquí va tu lógica para procesar los datos recibidos

  let divided = data.split(",");

  let fechaHora = divided[6].split("");

  function time(fechaHora) {
    let hora = "";
    for (let i = 6; i < fechaHora.length; i++) {
      hora += fechaHora[i];
    }
    return hora;
  }

  let GPSStatus = divided[7];
  let lat = divided[4];

  let accStatus = divided[17];

  function analyzeMeitrackInputs(accStatus) {
    const binaryStatus = parseInt(accStatus, 16).toString(2).padStart(16, "0");
    const activeInputs = countActiveInputs(binaryStatus);

    if (activeInputs === 0) {
      return "Battery removed";
    } else if (activeInputs === 2) {
      return "FFFFBBFF";
    } else {
      return "Other states";
    }
  }

  function 

  let long = divided[5];

  function convertLongitude(long) {
    // Convertir la longitud a un número decimal.
    
  }

  let vel = divided[10];

  function convertKmHToKnots(kmH) {
    // Convertir km/h a nudos.
    let knots = kmH / 1.852;

    // Redondear a 4 decimales.
    let roundedKnots = knots.toFixed(2);

    // Asegurar que la velocidad tenga siempre 3 dígitos.
    return roundedKnots.padStart(3, "0");
  }

  function date(fechaHora) {
    let fecha = "";
    for (let i = 0; i < 6; i++) {
      fecha += fechaHora[i];
    }
    return (
      fecha.slice(4) + fecha.slice(2, 4) + fecha.slice(0, 2)
    ); /* Cambiar formato AAMMDD a DDMMAA */
  }
  let DireccionLat = lat >= 0 ? "N" : "S";
  let DireccionLong = long >= 0 ? "E" : "W";
  let Hora = time(fechaHora);
  let Velocidad = convertKmHToKnots(vel);

  let imei;
  if (divided[1] === "013227009650882") {
    imei = "013226004207938";
  } else {
    imei = divided[1];
  }

  let rumbo = divided[11];
  let latitud = convertLatitude(Math.abs(lat)); // Quitamos el signo negativo
  let longitud = convertLongitude(Math.abs(long)); // Quitamos el signo negativo
  let fecha = date(fechaHora);

  let SendPackage = [
    "*HQ",
    imei,
    "V1",
    Hora,
    GPSStatus,
    latitud,
    DireccionLat,
    longitud,
    DireccionLong,
    Velocidad,
    rumbo,
    fecha,
    accStatus(data), // Reemplazar "FFFFBBFF" por el estado del ACC
    "722",
    "310",
    "06211",
    "15036#",
  ];

  // Resto del código de la función newPackage...

  // Devolver el paquete modificado en formato string
  return SendPackage.join(",");
};

console.log(newPackage(data));
