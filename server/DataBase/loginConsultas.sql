insert into Grupo(ID_Grupo, Nombre_Grupo, Semestre)
values (1, 104, "Primero");

insert into Alumno(ID_Alumno, ID_Grupo, Nombre_Alumno, Apellido_Alumno)
values (123040053, 1, "Maria Fernanda", "Mendez Barrera");

insert into Login(ID_Alumno, COntraseña_Hash, Ultimo_Login)
values (123040053, "$2a$12$LhdmXjo1Nm6dHb6mi6Mljus6de5IcL6pvTPuVjpsyRICxSBKM/UqC", '2025-11-21');