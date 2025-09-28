const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const isAuthenticated = require('../middleware/isAuthenticated'); // <-- Importa el middleware

// Rutas públicas (GET)
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);

// Rutas protegidas (POST, PUT, DELETE)
router.post('/', isAuthenticated, booksController.createBook);
router.put('/:id', isAuthenticated, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
