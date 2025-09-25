const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/connect'); // Use your clean DB file
const routes = require('./routes');
const swaggerRoutes = require('./routes/swagger');

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Books and Categories API!');
});
// Swagger documentation
app.use('/api-docs', swaggerRoutes);
// Routes
app.use('/api', routes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🫡 Server running on port ${PORT} 🚀`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to the database:', err);
});
