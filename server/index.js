const express = require('express');
const cors = require('cors');
const path = require('path');
//const db = require('./db');
//import verificarCredenciales from './auth.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para leer datos de formulario 

// LÍNEA CORREGIDA: Apunta a client/src como la raíz estática
app.use(express.static(path.join(__dirname, '..', 'client', 'src'))); 

// --- RUTAS DE VISTAS (HTML) ---

// ... (Resto del código de rutas HTML/POST sin cambios)

app.get('/', (req, res) => {
    res.redirect('/inicio');
});

app.get('/login', (req, res) => {
    // RUTA HTML CORREGIDA
    res.sendFile(path.join(__dirname, '..', 'client', 'src', 'views', 'login', 'login.html'));
});

// ... (Ruta POST /login) ...

app.get('/inicio', (req, res) => {
    // RUTA HTML CORREGIDA
    res.sendFile(path.join(__dirname, '..', 'client', 'src', 'views', 'Principal', 'inicio.html'));
});

app.get('/opciones', (req, res) => {
    // RUTA HTML CORREGIDA
    res.sendFile(path.join(__dirname, '..', 'client', 'src', 'views', 'Opciones', 'salas.html'));
});

app.get('/formulario', (req, res) => {
    // RUTA HTML CORREGIDA
    res.sendFile(path.join(__dirname, '..', 'client', 'src', 'views', 'formulario', 'formulario.html'));
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

