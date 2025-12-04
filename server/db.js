// server/db.js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

// Apunta al archivo Unisalas.db dentro de la carpeta DataBase
const dbPath = path.resolve(__dirname, './DataBase/Unisalas.db');

let dbInstance = null;

async function conectarDB() {
    if (dbInstance) return dbInstance;

    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        // Modo WAL para que no se bloquee con muchos usuarios
        await db.exec('PRAGMA journal_mode = WAL;');

        // Creamos las tablas si no existen
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Laboratorio (
                ID_Laboratorio INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre_Laboratorio VARCHAR(50) NOT NULL,
                Capacidad INT NOT NULL,
                Estado VARCHAR(20) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Grupo (
                ID_Grupo INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre_Grupo VARCHAR(50) NOT NULL,
                Semestre VARCHAR(50) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Alumno (
                ID_Alumno INTEGER PRIMARY KEY AUTOINCREMENT,
                ID_Grupo INT NOT NULL,
                Nombre_Alumno VARCHAR(50) NOT NULL,
                Apellido_Alumno VARCHAR(50) NOT NULL,
                FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo)
            );

            CREATE TABLE IF NOT EXISTS Login (
                ID_Alumno INT PRIMARY KEY,
                Contraseña_Hash VARCHAR(255) NOT NULL,
                Ultimo_Login DATETIME,
                FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS Bloques (
                ID_Bloques INTEGER PRIMARY KEY AUTOINCREMENT,
                ID_Laboratorio INT NOT NULL,
                Dia VARCHAR(15),
                Hora_Inicio TIME NOT NULL,
                Hora_Fin TIME NOT NULL,
                Estado_Bloque VARCHAR(50) NOT NULL,
                FOREIGN KEY (ID_Laboratorio) REFERENCES Laboratorio(ID_Laboratorio)
            );

            CREATE TABLE IF NOT EXISTS Reservaciones (
                ID_Reservacion INTEGER PRIMARY KEY AUTOINCREMENT,
                ID_Grupo INT NOT NULL,
                ID_Laboratorio INT NOT NULL,
                ID_Alumno INT NOT NULL,
                ID_Bloque INT NOT NULL, 
                Fecha_Reserva DATE NOT NULL,
                Proposito VARCHAR(255),
                Fecha_Elaboracion DATE NOT NULL,
                FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
                FOREIGN KEY (ID_Laboratorio) REFERENCES Laboratorio(ID_Laboratorio),
                FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno),
                FOREIGN KEY (ID_Bloque) REFERENCES Bloques(ID_Bloques)
            );

            INSERT OR IGNORE INTO Grupo (ID_Grupo, Nombre_Grupo, Semestre) VALUES (1, '104', 'Primero');
        `);

        console.log('✅ Base de datos conectada y tablas listas.');
        dbInstance = db;
        return dbInstance;

    } catch (error) {
        console.error('❌ Error conexión DB:', error);
        throw error;
    }
}

module.exports = conectarDB;