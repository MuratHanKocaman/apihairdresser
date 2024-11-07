// swaggerOptions.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "https://apihairdresser.onrender.com", // API'nizin çalıştığı URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          in: "header", // Token'ı başlık (header) alanında alacağını belirtiyoruz
          name: "Authorization", // Başlığın adı "Authorization" olacak
          description: "Bearer token formatında giriniz: `Bearer <token>`",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Route dosyalarının konumu
};

const specs = swaggerJsdoc(options);

module.exports = specs;
