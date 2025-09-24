const Book = require('../models/books');       // Modelo de libro
const Category = require('../models/categories'); // Modelo de categoría (para validación)

// ====================================================
// GET /api/books — Obtener todos los libros
// ====================================================
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('category');

    const cleanedBooks = books.map(book => {
      const bookObj = book.toJSON();

      // Eliminar __v del category poblado si existe
      if (bookObj.category && bookObj.category.__v !== undefined) {
        delete bookObj.category.__v;
      }

      return bookObj;
    });

    res.status(200).json(cleanedBooks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los libros', error: err.message });
  }
};



// ====================================================
// GET /api/books/:id — Obtener un libro por ID
// ====================================================
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category');
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.status(200).json(book.toJSON());
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el libro', error: err.message });
  }
};

// ====================================================
// POST /api/books — Crear un nuevo libro
// ====================================================
const createBook = async (req, res) => {
  const { title, author, category, year, price } = req.body;

  // Validación básica de campos requeridos
  if (!title || !author || !category || !year || !price) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Validar que la categoría exista
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'La categoría especificada no existe' });
    }

    // Crear el libro
    const newBook = new Book({ title, author, category, year, price });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook.toJSON());
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el libro', error: err.message });
  }
};

// ====================================================
// PUT /api/books/:id — Actualizar un libro
// ====================================================
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, year, price } = req.body;

  try {
    // Validar que la categoría exista (opcional, si viene en el body)
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'La categoría especificada no existe' });
      }
    }

    // Actualizar el libro
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, category, year, price },
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(updatedBook.toJSON());
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el libro', error: err.message });
  }
};

// ====================================================
// DELETE /api/books/:id — Eliminar un libro
// ====================================================
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Libro eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el libro', error: err.message });
  }
};

// ====================================================
// Exportar los controladores
// ====================================================
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
