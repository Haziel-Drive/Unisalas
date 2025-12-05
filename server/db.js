// Conexion de la base de datos SQLITE3
const path = require('path')
const sqlite = require('sqlite3')

const dbPath = path.resolve(__dirname, './DataBase/Unisalas.db');

const db = new sqlite.Database(
    dbPath,
    (error) => {
        if(error){
            return console.error('Error al abrir DB:', error.message) 
        }
        console.log('Conexión exitosa, creando tablas...');

        const sql = `
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
    FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno) 
        ON DELETE CASCADE
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
    ID_Bloque INT UNIQUE NOT NULL,
    Fecha_Reserva DATE NOT NULL,
    Proposito VARCHAR(255),
    Fecha_Elaboracion DATE NOT NULL,
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
    FOREIGN KEY (ID_Laboratorio) REFERENCES Laboratorio(ID_Laboratorio),
    FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno),
    FOREIGN KEY (ID_Bloque) REFERENCES Bloques(ID_Bloques)
);

CREATE TABLE IF NOT EXISTS Detalle_Reserva (
    ID_Reservacion INT NOT NULL,
    ID_Alumno INT NOT NULL,
    PRIMARY KEY (ID_Reservacion, ID_Alumno),
    FOREIGN KEY (ID_Reservacion) REFERENCES Reservaciones(ID_Reservacion)
        ON DELETE CASCADE,
    FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno)
);

-- INSERCIÓN DE DATOS DE PRUEBA (CRUCIAL PARA EL LOGIN)
INSERT OR IGNORE INTO Grupo (ID_Grupo, Nombre_Grupo, Semestre) VALUES (1, '104', 'Primero');
INSERT OR IGNORE INTO Alumno (ID_Alumno, ID_Grupo, Nombre_Alumno, Apellido_Alumno) VALUES (123, 1, 'Admin', 'User');
INSERT OR IGNORE INTO Login (ID_Alumno, Contraseña_Hash) VALUES (123, 'admin'); -- Usuario de prueba 123/admin
`;

        // Ejecutar todo el script SQL en un solo comando
        db.exec(sql, (err) => {
            if (err) {
                console.error('Error al ejecutar script SQL:', err.message);
            } else {
                console.log('Tablas y datos de prueba creados/verificados exitosamente.');
            }
        });
    }
);

module.exports = db;