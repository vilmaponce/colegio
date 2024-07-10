/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

// 1 - Importamos el módulo de mysql2
const mysql = require("mysql2");

// 2 - Configuración de la conexión
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    port: 3306,
    database: "luminova"
});

// 3 - Iniciamos la conexión a la BBDD
connection.connect((err) => {
    if (err) {
        console.error(`Error conectando con la base de datos: ${err}`);
        return;
    }
    console.log(`Conectado a la base de datos.`);
});

// 4 - Exportamos el módulo
module.exports = connection;