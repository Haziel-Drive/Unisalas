const express = require('express');
const cors = require('cors');
const path = require('path');
//const db = require('./db');
//import express from 'express';
//import cors from 'cors';
//import path from 'path';


// Modulo de Lógica de Autenticación
//import verificarCredenciales from './auth.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para leer datos de formulario 


// COMENTADO: Se eliminó esta ruta duplicada para asegurar que la raíz (/)
// siempre redirija al login, que es el flujo de inicio de la aplicación.
/*app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Servidor funcionando',
        port: PORT
    });
});*/

// --- RUTAS DE VISTAS (HTML) ---

// 1. VISTA: LOGIN
// Cuando entren a 'localhost:3000/' o 'localhost:3000/login'
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    // Busca el archivo en la carpeta 'views'
    res.sendFile(path.join(__dirname, 'views', 'login', 'login.html'));
});

// index.js (Continuación)

// 5. RUTA DE AUTENTICACIÓN (POST)
app.post('/login', async (req, res) => {
    // 1. Obtener los datos del cuerpo de la solicitud POST
    // Asumimos que el formulario envía campos llamados 'usuario' y 'contrasena'
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        // Enviar un mensaje de error si faltan datos
        return res.status(400).json({ success: false, message: 'Faltan usuario o contraseña.' });
    }

    try {
        // 2. Llamar a la función que consulta la base de datos
        const autenticado = await verificarCredenciales(usuario, contrasena);

        if (autenticado) {
            // 3. Autenticación Exitosa: Redirigir a la vista de inicio
            // En el backend, lo mejor es enviar un JSON de éxito o una URL de redirección
            res.json({ success: true, redirect: '/inicio' });
            // NOTA: La redirección real del usuario se debe manejar en el JavaScript del frontend (login.html)
        } else {
            // 4. Autenticación Fallida
            res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' });
        }
    } catch (error) {
        console.error('Error al intentar autenticar:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

// 2. VISTA: INICIO
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Principal', 'inicio.html'));
});

// 3. VISTA: OPCIONES
app.get('/opciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'opciones.html'));
});

// 4. VISTA: FORMULARIO
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario', 'formulario.html'));
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

