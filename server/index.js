const express = require('express');
const cors = require('cors');

const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Servidor funcionando',
        port: PORT
    });
});

// --- RUTAS DE VISTAS (HTML) ---

// 1. VISTA: LOGIN
// Cuando entren a 'localhost:3000/' o 'localhost:3000/login'
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    // Busca el archivo en la carpeta 'views'
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// 2. VISTA: INICIO
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'inicio.html'));
});

// 3. VISTA: OPCIONES
app.get('/opciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'opciones.html'));
});

// 4. VISTA: FORMULARIO
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});