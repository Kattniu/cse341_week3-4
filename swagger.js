const swaggerAutogen = require('swagger-autogen')();

const isProduction = true; // Fuerza producción

const doc = {
  info: {
    title: 'API de Categorías y Libros',
    description: 'Una API para gestionar libros y categorías',
  },
  host: isProduction ? 'cse341-week3-4-x3g1.onrender.com' : 'localhost:8080',
  basePath: '/api',
  schemes: [isProduction ? 'https' : 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('✅ Swagger generado con host de producción');
    require('./server.js');
  })
  .catch((err) => {
    console.error('❌ Error generando swagger.json:', err);
  });
