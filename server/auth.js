// auth.js (Versión de Conexión Real a SQLite)

const sqlite3 = require('sqlite3').verbose();
const db = require('./db'); // Asegúrate de que tu conexión a la DB esté aquí

function verificarCredenciales(usuario, contrasena) {
    return new Promise((resolve, reject) => {
        // Asegúrate de usar el nombre de columna EXACTO (Contraseña_Hash)
        const sql = 'SELECT ID_Alumno FROM Login WHERE ID_Alumno = ? AND Contraseña_Hash = ?'; 
        
        db.get(sql, [usuario, contrasena], (err, row) => {
            if (err) {
                console.error('Error en la consulta de autenticación:', err.message);
                return reject(err);
            }

            // Si 'row' existe, significa que SQLite encontró la coincidencia.
            if (row) {
                resolve(true); // Autenticación exitosa
            } else {
                resolve(false); // Credenciales incorrectas
            }
        });
    });
}

module.exports = {
    verificarCredenciales
};