// routes/index.js
const express = require('express');
const router = express.Router();
const booksRoutes = require('./books');
const categoriesRoutes = require('./categories');

// Ruta base para mostrar que la API está activa
router.get('/', (req, res) => {
  res.send('Bienvenido a la API de CSE341 - Proyecto Week 3 & 4');
});

// Rutas para libros y categorías
router.use('/books', booksRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
