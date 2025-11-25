CREATE TABLE Grupo (
    ID_Grupo INT PRIMARY KEY,
    Nombre_Grupo VARCHAR(50) NOT NULL,
    Semestre VARCHAR(20)
);

CREATE TABLE Laboratorio (
    ID_Laboratorio INT PRIMARY KEY,
    Num_Laboratorio INT NOT NULL UNIQUE, -- Asegura que no haya dos laboratorios con el mismo número
    Ubicacion VARCHAR(100),
    Capacidad INT,
    Equipamiento VARCHAR(255)
);

CREATE TABLE Alumno (
    ID_Alumno INT PRIMARY KEY,
    ID_Grupo INT NOT NULL,
    Nombre_Alumno VARCHAR(50) NOT NULL,
    Apellido_Alumno VARCHAR(50) NOT NULL,
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo)
);

CREATE TABLE Login (
    ID_Alumno INT PRIMARY KEY,
    Contraseña_Hash VARCHAR(255) NOT NULL, -- Guardar la contraseña hasheada (cifrada)
    Ultimo_Login DATETIME,
    FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno) 
        ON DELETE CASCADE -- Si el alumno es eliminado, sus credenciales se eliminan
);

CREATE TABLE Bloques (
    ID_Bloques INT PRIMARY KEY,
    ID_Laboratorio INT NOT NULL,
    Dia VARCHAR(15), -- Asumiendo días de la semana (Lunes, Martes, etc.)
    Hora_Inicio TIME NOT NULL,
    Hora_Fin TIME NOT NULL,
    Estado_Bloque VARCHAR(50) NOT NULL, -- Ej: 'Clase Asignada', 'Disponible'
    FOREIGN KEY (ID_Laboratorio) REFERENCES Laboratorio(ID_Laboratorio)
);

CREATE TABLE Reservaciones (
    ID_Reservacion INT PRIMARY KEY,
    ID_Grupo INT NOT NULL,          -- Grupo base para la lista de asistentes
    ID_Laboratorio INT NOT NULL,    -- Laboratorio reservado
    ID_Alumno INT NOT NULL,         -- Alumno Responsable (quien hizo la reserva)
    ID_Bloque INT UNIQUE NOT NULL,  -- Bloque de horario reservado (UNIQUE para 1:1)
    Fecha_Reserva DATE NOT NULL,
    Proposito VARCHAR(255),
    Fecha_Elaboracion DATE NOT NULL,
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
    FOREIGN KEY (ID_Laboratorio) REFERENCES Laboratorio(ID_Laboratorio),
    FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno),
    FOREIGN KEY (ID_Bloque) REFERENCES Bloques(ID_Bloques)
);

CREATE TABLE Detalle_Reserva (
    ID_Reservacion INT NOT NULL,
    ID_Alumno INT NOT NULL,
    -- La combinación de ambos campos es la Clave Primaria
    PRIMARY KEY (ID_Reservacion, ID_Alumno),
    FOREIGN KEY (ID_Reservacion) REFERENCES Reservaciones(ID_Reservacion)
        ON DELETE CASCADE, -- Si se elimina la reserva, se eliminan los detalles
    FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID_Alumno)
);

