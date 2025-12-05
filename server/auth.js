 // auth.js
//import db from './db.js';

const db = require('./db.js');

function verificarCredenciales(usuario, contrasena) {
    return new Promise((resolve, reject) => {
        // Busca coincidencia exacta de usuario y contraseña
        const sql = 'SELECT ID_Alumno FROM Login WHERE ID_Alumno = ? AND Contraseña_Hash = ?'; 
        
        db.get(sql, [usuario, contrasena], (err, row) => {
            if (err) {
                console.error('Error en DB:', err.message);
                return reject(err);
            }

            // Si row tiene datos, el usuario existe y la contraseña es correcta
            if (row) {
                resolve(true); 
            } else {
                resolve(false); 
            }
        });
    });
}

module.exports = verificarCredenciales;

/*
const db = require('./db.js');

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

module.exports = verificarCredenciales;
*/