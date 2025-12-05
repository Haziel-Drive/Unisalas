const express = require('express');
const cors = require('cors');
const path = require('path');
//const db = require('./db');
const verificarCredenciales = require('./auth.js');
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
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    console.log(`Intento de login: Usuario ${usuario}`);

    try {
        const autenticado = await verificarCredenciales(usuario, contrasena);
        
        if (autenticado) {
            console.log('Login Exitoso. Redirigiendo...');
            res.redirect('/opciones'); 
        } else {
            console.log('Credenciales Incorrectas.');
            res.status(401).send(`
                <h1>Error de Autenticación</h1>
                <p>Credenciales incorrectas.</p>
                <a href="/login">Volver a intentar</a>
            `);
        }
    } catch (error) {
        console.error('Error en servidor:', error);
        res.status(500).send('Error interno del servidor');
    }
});


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

