const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Cargar variables de entorno
dotenv.config();

// Importar módulos
const connectDB = require('./db/connect');
const routes = require('./routes'); // tus rutas normales (/books, /categories, etc.)
const swaggerRoutes = require('./routes/swagger');
const authRoutes = require('./routes/auth'); // 👈 tus rutas de autenticación
require('./auth/passport'); // 👈 configura la estrategia de GitHub aquí

// Crear app
const app = express();

// Middlewares generales
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true
}));

// Configurar express-session (requerido para Passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Welcome to the Books and Categories API with OAuth!');
});

// Swagger Docs
app.use('/api-docs', swaggerRoutes);

// Rutas protegidas de tu API
app.use('/api', routes);

// Rutas de autenticación
app.use('/auth', authRoutes);

// Conectar a MongoDB y levantar servidor
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🫡 Server running on port ${PORT} 🚀`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to the database:', err);
});
