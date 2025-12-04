// server/routes/reservas.routes.js
const express = require('express');
const router = express.Router();
const { crearReserva } = require('../controllers/reservasController');

// Definimos la ruta POST /reservar
router.post('/reservar', crearReserva);

module.exports = router;