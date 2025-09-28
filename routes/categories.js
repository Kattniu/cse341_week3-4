const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const isAuthenticated = require('../middleware/isAuthenticated'); // <-- Importa el middleware

// Rutas públicas (GET)
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

// Rutas protegidas (POST, PUT, DELETE)
router.post('/', isAuthenticated, categoriesController.createCategory);
router.put('/:id', isAuthenticated, categoriesController.updateCategory);
router.delete('/:id', isAuthenticated, categoriesController.deleteCategory);

module.exports = router;
