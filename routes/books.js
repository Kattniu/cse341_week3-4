// routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

// Ruta GET: Obtener todos los libros
router.get('/', booksController.getAllBooks);

// Ruta GET: Obtener un libro por su ID
router.get('/:id', booksController.getBookById);

// Ruta POST: Crear un nuevo libro
router.post('/', booksController.createBook);

// Ruta PUT: Actualizar un libro por su ID
router.put('/:id', booksController.updateBook);

// Ruta DELETE: Eliminar un libro por su ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
