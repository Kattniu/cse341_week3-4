const mongoose = require('mongoose');

// Definimos el esquema para la colección 'categories' con mongoose
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // El campo 'name' es obligatorio
  },
  description: {
    type: String,
    required: false, // El campo 'description' es opcional
  },
});
 // Esta transformación hará que al convertir a JSON se quite __v (por si queda)
categorySchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

// Exportamos el modelo para poder usarlo en otros archivos
module.exports = mongoose.model('Category', categorySchema);
