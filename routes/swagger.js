const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');  // Importar el swagger.json generado

// Rutas para mostrar la documentación
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    withCredentials: true
  }
}));


module.exports = router;

//Esto le dice a Swagger UI que:
//Cuando haga peticiones desde la interfaz (como POST /books), debe enviar automáticamente las cookies, como connect.sid (que contiene la sesión).
//Esto mejora la compatibilidad para Swagger UI en producción y me asegura que la autenticación con sesiones funcione bien siempre.