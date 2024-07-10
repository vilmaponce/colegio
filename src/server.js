/**
 * Punto principal de acceso al servidor
 */

// 1 - Importamos express
const express = require("express");

// Importamos path
const path = require("path");

// 2 - Instanciamos express
const app = express();

// 3 - Importamos el modulo de las rutas
const luminovaRouter = require("../routes/luminovaRouter");

// 4 - Declaramos el puerto
const PORT = 3000;

// 5 - Transformación del body a formato legible
app.use(express.json());

// 6 - Prefijo principal de las rutas
app.use("/luminova", luminovaRouter);

// Configuración para servir archivos estáticos 
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './public')));

// 7 - Inicialización del servidor
app.listen(PORT, () => {console.log(`Servidor corriendo en http://localhost:${PORT}/index.html`)});

// 8 - Codificamos luminovaRouter.js 