// routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

// Ruta GET: Obtener todas las categorías
router.get('/', categoriesController.getAllCategories);
//Ruta GET: Obtener una categoría por ID
router.get('/:id', categoriesController.getCategoryById);

// Ruta POST: Crear una nueva categoría
router.post('/', categoriesController.createCategory);

// Rutas PUT y DELETE para actualizar y eliminar categorías por ID
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
