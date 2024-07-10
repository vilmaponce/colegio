/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getStudentByDniAndPsw
 * .getAllRegistrations
 * .createStudent
 * .createRegistrations
 * .updateStudent
 * .deleteRegistration
 */

// 1 - Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos
const db = require("../db/db.js");

// MÉTODOS QUE RESPONDERAN A LAS PETICIONES DE luminovaRouter.js
// A - .getStudentByDniAndPsw - FUNCIONA FE y BE
const getStudentByDniAndPsw = (req, res) => {
    // Desestructuramos la request
    const { dni, clave } = req.query;
    // Creamos la consulta para traer los datos del alumno que concida con el dni y clave
    const sql = "SELECT * FROM alumno WHERE dni = ? AND clave = ?";
    // Enviamos la consulta a la base de datos
    db.query(sql, [dni, clave], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json(result);
    });
};

// B - .getAllRegistrations - FUNCIONA FE y BE
const getAllRegistrations = (req, res) => {
    // Desestructuramos la request
    const { dni } = req.query;
    // Creamos la consulta para traer las inscripciones que posea un alumno al brindarle su DNI
    const sql = 'SELECT i.id, c.nombre AS curso_nombre, i.estado FROM inscripcion i JOIN curso c ON i.curso_id = c.id WHERE i.alumno_dni = ?;';
    // Enviamos la consulta a la base de datos
    db.query(sql, [dni], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json(result);
    });
};

const actividadIds = {
    "natacion": 4,
    "basket": 15,
    "futbol": 16,
    "atletismo": 17,
    "teatro": 18,
    "musica": 19,
    "pintura_dibujo": 20,
    "ciencias": 21,
    "lectura": 22,
    "debate": 23,
    "hospitales": 24,
    "refugios_animales": 25,
    "ingles": 1,
    "frances": 2,
    "aleman": 3,
    "huerta": 26
    // Agrega más actividades según sea necesario
};

const createRegistrations = (req, res) => {
    const { alumno_dni, estado } = req.body;
    let { curso_id } = req.body;

    // Verifica si curso_id existe en el mapeo
    if (!actividadIds[curso_id]) {
        return res.status(400).json({ error: 'El nombre del curso no es válido.' });
    }

    // Obtiene el ID numérico del curso
    curso_id = actividadIds[curso_id];

    const sql = 'INSERT INTO inscripcion (alumno_dni, curso_id, estado) VALUES (?, ?, ?)';
    db.query(sql, [alumno_dni, curso_id, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar inscripción:', err);
            return res.status(500).json({ error: 'Error interno del servidor al registrar la inscripción.' });
        }
        console.log('Inscripción insertada correctamente.');
        res.json({ mensaje: '¡Inscripción exitosa!' });
    });
};



// D - .createStudent - FUNCIONA FE y BE
const createStudent = (req, res) => {
    // Desestructuramos la request
    const { dni, nombre, apellido, nacimiento, genero, email, telefono, calle, num_calle, ciudad, cp, escolaridad, clave } = req.body;
    // Creamos la consulta para cargar un alumno
    const sql = "INSERT INTO alumno (dni, nombre, apellido, nacimiento, genero, email, telefono, calle, num_calle, ciudad, cp,escolaridad, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";
    // Enviamos la consulta a la base de datos
    db.query(sql, [dni, nombre, apellido, nacimiento, genero, email, telefono, calle, num_calle, ciudad, cp,escolaridad, clave], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json({ mensaje: "¡Alumno cargado con éxito!" });
    });
};

// D - .updateStudent - FUNCIONA FE y BE
const updateStudent = (req, res) => {
    // Obtenemos el id que nos solicita el request
    const { email, telefono, calle, num_calle, ciudad, cp, dni } = req.body;
    // Creamos la consulta para traer la pelicula con ese id
    const sql = 'UPDATE alumno SET email = ?, telefono = ?, calle = ?, num_calle = ?, ciudad = ?, cp = ? WHERE dni = ?';
    // Enviamos la consulta a la base de datos
    db.query(sql, [email, telefono, calle, num_calle, ciudad, cp, dni], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json({ mensaje: "¡Datos del alumno modificados con éxito!"});
    });
};

// E - .deleteRegistration - FUNCIONA FE y BE
const deleteRegistration = (req, res) => {
    // Obtenemos el dni y id del cuerpo del request
    const { dni, id } = req.body;
    
    // Creamos la consulta para actualizar el estado de la inscripción
    const sql = "UPDATE inscripcion SET estado = 0 WHERE alumno_dni = ? AND id = ?;";
    
    // Enviamos la consulta a la base de datos
    db.query(sql, [dni, id], (err, result) => {
        // Si ocurre un error al ejecutar la consulta
        if (err) {
            console.error("Error al actualizar inscripción:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        // Si la actualización fue exitosa
        res.json({ mensaje: "¡Inscripción dada de baja con éxito!" });
    });
};




// 2 - Importamos el mdoulo
module.exports = {
    getStudentByDniAndPsw,
    getAllRegistrations,
    createStudent,
    createRegistrations,
    updateStudent,
    deleteRegistration

}

// 3 -  Configuramos el archivo db.js