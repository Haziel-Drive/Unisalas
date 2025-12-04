// server/controllers/reservasController.js
const conectarDB = require('../db');

async function crearReserva(req, res) {
    // 1. Conectamos a la DB
    const db = await conectarDB();
    
    // 2. Sacamos los datos que envió el usuario
    const { idGrupo, idLaboratorio, idAlumno, idBloque, fechaReserva, proposito } = req.body;

    try {
        // --- VALIDACIÓN ---
        // Buscamos si ya existe una reserva con ese MISMO bloque y esa MISMA fecha
        const reservaExistente = await db.get(
            `SELECT ID_Reservacion FROM Reservaciones 
             WHERE ID_Bloque = ? AND Fecha_Reserva = ?`,
            [idBloque, fechaReserva]
        );

        if (reservaExistente) {
            return res.status(409).json({ 
                success: false, 
                message: "Ese horario ya está ocupado para la fecha seleccionada." 
            });
        }

        // --- GUARDADO ---
        const fechaElaboracion = new Date().toISOString().split('T')[0]; // Fecha de hoy

        await db.run(
            `INSERT INTO Reservaciones (
                ID_Grupo, ID_Laboratorio, ID_Alumno, ID_Bloque, 
                Fecha_Reserva, Proposito, Fecha_Elaboracion
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [idGrupo, idLaboratorio, idAlumno, idBloque, fechaReserva, proposito, fechaElaboracion]
        );

        res.status(201).json({ success: true, message: "Reserva creada exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
}

module.exports = { crearReserva };