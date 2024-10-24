// swaggerOptions.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:5000', // API'nizin çalıştığı URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Route dosyalarının konumu
};

const specs = swaggerJsdoc(options);

module.exports = specs;