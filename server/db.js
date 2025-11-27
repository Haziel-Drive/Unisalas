// Conexion de la base de datos SQLITE3
const path = require('path')
const sqlite = require('sqlite3')

const db = new sqlite.Database(
    path.resolve(__dirname, './DataBase/Unisalas.db'),
    (error) => {
        if(error){
            return console.error(error) 
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

INSERT OR IGNORE INTO Grupo (ID_Grupo, Nombre_Grupo, Semestre) VALUES (1, '104', 'Primero');
`;


/*
COMENTARIO HAZIEL: ESTE CODIGO SOLO FUE NECESARIO PARA GENERAR AQUI LA BSE DE DATOS
YA NO ES NECESARIO, DECIDAN SI DEJARLO

         aqui se ejecuta tabsla uno por uno
        const statements = sql.split(';').filter(stmt => stmt.trim());
        
        function executeStatements(index) {
            if (index >= statements.length) {
                console.log('Todas las tablas creadas exitosamente');
                return;
            }
            
            const statement = statements[index].trim();
            if (statement) {
                db.run(statement, function(err) {
                    if (err) {
                        console.error('Error ejecutando:', statement);
                        console.error('Error:', err.message);
                    } else {
                        console.log('Ejecutado:', statement.substring(0, 50) + '...');
                    }
                    executeStatements(index + 1);
                });
            } else {
                executeStatements(index + 1);
            }
        }
        
        executeStatements(0);
    }
);
*/

});

module.exports = db;

/*
db.all("SELECT * FROM Grupo", (err, rows) => {
    if (err) throw err;
    console.log("Grupos:", rows);
});
*/
// TABLA VACIA NECESITA ALUMNOS
db.all("SELECT * FROM Alumno", (err, rows) => {
    if (err) throw err;
    console.log("Alumnos:", rows);
});
/*
db.all("SELECT * FROM Grupo", (err, rows) => {
    if (err) {
        console.log("Error en Grupo:", err.message);
    } else {
        console.log("Datos en Grupo:", rows);
        console.log("Número de registros:", rows.length);
    }
});
*/