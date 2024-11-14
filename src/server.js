// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  "origin": process.env.CORS_ORIGIN
}));
app.use(express.json());

// Importar rutas
const interconsultaRoutes = require('./routes/interconsultaRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Usar rutas
app.use('/api/interconsultas', interconsultaRoutes);
app.use('/api/servicios', serviceRoutes);
app.use('/api/auth', authRoutes); // Añade esta línea

// Conexión a MongoDB
console.log('Conectando a MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    exito: false,
    error: 'Error interno del servidor',
    detalles: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    error: 'Ruta no encontrada'
  });
});