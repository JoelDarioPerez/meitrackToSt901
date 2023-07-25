// gpsModifier.js
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

const newPackage = (data) => {
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

  const getACCStatusString = (paquete) => {
    let divided = data.split(",");
    let accStatus = divided[17];

    if (accStatus === "0000") {
      return "FFFFBBFF"; // ACC apagado
    } else if (accStatus === "0400") {
      return "FFFFBBFF"; // ACC encendido
    } else {
      return "Estado del ACC desconocido";
    }
  };

  function convertLatitude(lat) {
    // Convertir la latitud a un número decimal.
    lat = parseFloat(lat);

    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(lat));
    let minutes = (Math.abs(lat) - degrees) * 60;

    // Obtener la dirección (N o S).
    let direction = lat >= 0 ? "N" : "S";

    // Devolver la latitud en el formato "DDMM.MMMM".
    return `${degrees.toString().padStart(2, "0")}${minutes.toFixed(4)}`;
  }

  let long = divided[5];

  function convertLongitude(long) {
    // Convertir la longitud a un número decimal.
    long = parseFloat(long);

    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(long));
    let minutes = (Math.abs(long) - degrees) * 60;

    // Obtener la dirección (E o W).
    let direction = long >= 0 ? "E" : "W";

    // Devolver la longitud en el formato "DDDMM.MMMM".
    return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
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
  let imei = divided[1];
  let rumbo = divided[11];
  let latitud = convertLatitude(Math.abs(lat)); // Quitamos el signo negativo
  let longitud = convertLongitude(Math.abs(long)); // Quitamos el signo negativo
  let fecha = date(fechaHora);

  let accStatus = getACCStatusString(data); // Obtener el estado del ACC

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
    accStatus, // Reemplazar "FFFFBBFF" por el estado del ACC
    "722",
    "310",
    "06211",
    "15036#",
  ];

  return SendPackage.join(",");
};

module.exports = {
  newPackage,
};
