/**
 * Enrutador 
 * Endpoints (finalización de la ruta)
 */

// 1 - Importamos express
const express = require("express");

// 2 - Instanciamos el router de Express
const router = express.Router();

// 3 - Importamos el módulo controlador de funciones propio
const luminovaController = require("../controllers/luminovaController");

// 4 - Planteamos las solicitudes GET, POST, PUT, DELETE

// Peticion GET - Ingreso de usuario - Ruta Parametrizada Query DNI y CLAVE
router.get("/ingresar", luminovaController.getStudentByDniAndPsw);

// Peticion GET - Listado completo de inscripciones
router.get("/list", luminovaController.getAllRegistrations);

// Petición POST - Cargar alumno en el sistema
router.post("/login", luminovaController.createStudent);

// Petición POST - Cargar inscripcion en el sistema
router.post("/inscripcion", luminovaController.createRegistrations);

// Peticion PUT - Actualziar alumno - Ruta Parametrizada :dni
router.put("/:dni", luminovaController.updateStudent);

// Petición PUT - Dar de baja inscripción - Ruta Parametrizada Query DNI
router.put("/:dni/inscripciones", luminovaController.deleteRegistration);

// 5 - Importamos el módulo
module.exports = router; // Ya está afectado a todas las acciones anteriores

// 6 -  Codificamos luminovaController.js