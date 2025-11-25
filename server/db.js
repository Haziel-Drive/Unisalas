//Conexión a la base de datos

// db.js
const sqlite3 = require('sqlite3').verbose();
// Reemplaza 'nombre_de_tu_base.db' con el nombre real de tu archivo SQLite
const DB_PATH = './DataBase/Reserva_Salas'; 

// Crea y abre la conexión a la base de datos.
// sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE asegura que si no existe el archivo, lo crea.
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite.');
    }
});

// Exporta la conexión para poder usarla en index.js o en otros archivos de lógica.
module.exports = db;

db.all("SELECT * FROM Grupo", (err, rows) => {
    if (err) throw err;
    console.log("Grupos:", rows);
});

db.all("SELECT * FROM Alumno", (err, rows) => {
    if (err) throw err;
    console.log("Alumnos:", rows);
});

db.all("SELECT * FROM Grupo", (err, rows) => {
    if (err) {
        console.log("Error en Grupo:", err.message);
    } else {
        console.log("Datos en Grupo:", rows);
        console.log("Número de registros:", rows.length);
    }
});