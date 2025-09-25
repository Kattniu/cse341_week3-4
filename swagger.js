const swaggerAutogen = require('swagger-autogen')();

const isProduction = true; // force/fuerza a producción

const doc = {
  info: {
    title: 'Categories and Books API',
    description: 'An API to manage books and categories',
  },
  host: isProduction ? 'cse341-week3-4-x3g1.onrender.com' : 'localhost:8080',
  basePath: '/api',
  schemes: [isProduction ? 'https' : 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('✅ Swagger generated with production host');
    require('./server.js');
  })
  .catch((err) => {
    console.error('❌ Error generating swagger.json:', err);
  });
