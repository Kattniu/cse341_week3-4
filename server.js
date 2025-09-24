const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/connect'); // Usas tu archivo limpio
const routes = require('./routes');
const swaggerRoutes = require('./routes/swagger');

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Documentación Swagger
app.use('/api-docs', swaggerRoutes);

// Rutas
app.use('/api', routes);

// Conectar a MongoDB y arrancar el servidor
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🫡 Servidor corriendo en el puerto ${PORT} 🚀`);
  });
}).catch((err) => {
  console.error('❌ No se pudo conectar a la base de datos:', err);
});
