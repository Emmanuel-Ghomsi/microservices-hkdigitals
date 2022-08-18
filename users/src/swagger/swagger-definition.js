const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { PORT } = require("../config");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Rest users",
    version: "1.0.0",
    description: "API Rest manage simple users logic.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Hkdigitals",
      url: "https://hkdigitals.com",
      email: "contact@hkdigitals.com",
    },
  },
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/swagger/definitions/*.definitions.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = async (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
