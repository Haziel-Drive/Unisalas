// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const conectarDB = require('./db'); 
const reservasRoutes = require('./routes/reservas.routes'); // Importamos tus rutas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (HTML/CSS del cliente)
app.use(express.static(path.join(__dirname, '../client/src')));

// --- RUTAS DE LA API ---
app.use('/api', reservasRoutes); 
// Esto significa que tu ruta será: http://localhost:3000/api/reservar

// --- VISTAS (HTML) ---
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/views/login/login.html'));
});

app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/views/Principal/inicio.html'));
});

app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/views/formulario/formulario.html'));
});

// Iniciamos servidor SOLO si la DB conecta
conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
});