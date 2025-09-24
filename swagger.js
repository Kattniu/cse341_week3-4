const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Categorías y Libros',
    description: 'Una API para gestionar libros y categorías',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Tus archivos de rutas que contienen las anotaciones de Swagger

// Generamos el archivo swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger file generated successfully!');
    require('./server.js'); // Ahora que se generó el archivo, arrancamos el servidor
  })
  .catch((err) => {
    console.log('Error generando swagger.json:', err);
  });
