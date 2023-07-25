const net = require("net");
const { gpsTrackerServer } = require("./gpsTrackerServer");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

// Ejecutamos la función del servidor
const host = process.env.HOST_input; // Escucha en todas las interfaces
const port = process.env.PORT_input; // Puerto del servidor TCP
gpsTrackerServer(host, port);
