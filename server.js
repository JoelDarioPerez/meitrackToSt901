const http = require('http');

const server = http.createServer((req, res) => {
  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    console.log('Paquete recibido:', data);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Paquete recibido exitosamente\n');
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
