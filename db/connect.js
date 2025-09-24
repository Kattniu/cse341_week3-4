// Importar la librería mongoose para manejar la conexión y esquemas de MongoDB
const mongoose = require('mongoose');

// Importar y cargar las variables de entorno definidas en el archivo .env
require('dotenv').config();

// Función asíncrona que intenta conectar con la base de datos MongoDB
const connectDB = async () => {
  try {
    // Intentar establecer la conexión con MongoDB usando la URI de conexión que está en las variables de entorno
    // process.env.MONGODB_URI es una cadena que contiene la dirección y credenciales para conectarse a MongoDB Atlas (o local)
    await mongoose.connect(process.env.MONGODB_URI);

    // Si la conexión fue exitosa, mostrar un mensaje bonito en la consola
    console.log('Conexión exitosa a MongoDB🎉');
  } catch (err) {
    // Si hubo un error al conectar, mostrar el mensaje de error en la consola
    console.error('✖️Error al conectar a MongoDB:', err.message);

    // Terminar la ejecución del programa porque no tiene sentido seguir si no hay base de datos
    process.exit(1);
  }
};

// Exportar esta función para que pueda ser usada en otros archivos, por ejemplo en server.js
module.exports = connectDB;
