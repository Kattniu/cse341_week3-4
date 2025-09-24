// routes/index.js
const express = require('express');
const router = express.Router();
const booksRoutes = require('./books');
const categoriesRoutes = require('./categories');

// Usamos rutas para books y categories
router.use('/books', booksRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
