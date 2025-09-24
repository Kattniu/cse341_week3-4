const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio'],
  },
 category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: [true, 'La categoría es obligatoria'],
  },
  year: {
  type: Number,
  required: [true, 'El año es obligatorio'],
  },
  price: {
  type: Number,
  required: [true, 'El precio es obligatorio'],
  min: [0, 'El precio no puede ser negativo'],
},
});

// Eliminar el campo __v en las respuestas JSON
bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});



const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
