const express = require("express"); // Importar Express
const bodyParser = require("body-parser"); // Importar body-parser para analizar el cuerpo de las solicitudes HTTP
const routes = require("./routes/routes"); // Importar las rutas definidas en routes.js
const cors = require("cors"); // Importar el paquete cors

// Configurar las variables de entorno
require("dotenv").config();

const app = express(); // Crear una instancia de la aplicación Express
app.use(bodyParser.json()); // Usar body-parser para analizar el cuerpo de las solicitudes en formato JSON

// Habilitar CORS con opciones adicionales
app.use(
  cors({
    origin: "http://localhost:4200", // Permitir solo solicitudes desde este origen
    methods: "GET,POST,PATCH,DELETE", // Permitir solo estos métodos HTTP
    allowedHeaders: "Content-Type,Authorization", // Permitir solo estos encabezados
  })
);

// Usar las rutas definidas en routes.js
app.use(routes);

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`; // Construir la URL base

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en la URL: ${URL}`);
});
