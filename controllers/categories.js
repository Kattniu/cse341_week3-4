// controllers/categories.js
const Category = require('../models/categories'); // Importamos el modelo de categoría

// ====================================================
// Obtener TODAS las categorías (GET /api/categories)
// ====================================================
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Busca todas las categorías en la base de datos
    res.status(200).json(categories.map(c => c.toJSON())); // Retorna el resultado como JSON sin __v
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};

// =====================================================
// Obtener UNA categoría por ID (GET /api/categories/:id)
// =====================================================
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  // Validación básica del ID (formato MongoDB)
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    const category = await Category.findById(id); // Buscar categoría por ID

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category.toJSON()); // Retornar la categoría
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving the category' });
  }
};

// =====================================================
// Crear una nueva categoría (POST /api/categories)
// =====================================================
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  // Validar que se incluya el nombre
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    // Crear instancia del modelo con los datos recibidos
    const newCategory = new Category({ name, description });

    // Guardar en la base de datos
    await newCategory.save();

    // Enviar respuesta exitosa
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Error creating the category' });
  }
};

// ======================================================
// Actualizar una categoría (PUT /api/categories/:id)
// ======================================================
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Validar formato del ID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  // Validar campo obligatorio
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    // Buscar y actualizar la categoría
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Devuelve la nueva versión y valida
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory.toJSON());
  } catch (err) {
    res.status(500).json({ message: 'Error updating the category' });
  }
};

// ======================================================
// Eliminar una categoría (DELETE /api/categories/:id)
// ======================================================
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  // Validar el ID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the category' });
  }
};
