const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'API de Categorías y Libros',
    description: 'Una API para gestionar libros y categorías',
  },
  host: isProduction ? 'cse341-week3-4-x3g1.onrender.com' : 'localhost:8080',
  basePath: '/api', // ✅ IMPORTANTE: para que las rutas sean correctas
  schemes: [isProduction ? 'https' : 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger file generated successfully!');
    require('./server.js'); // Arrancar el servidor después de generar Swagger
  })
  .catch((err) => {
    console.log('Error generando swagger.json:', err);
  });
