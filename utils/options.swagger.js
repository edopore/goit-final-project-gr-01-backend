const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Slimmoms Express API with Swagger",
      version: "0.1.0",
      description:
        "Es una simple aplicacion API para llevar control calórico de alimentos",
    },
    servers: [
      {
        url: "https://goit-final-project-gr-01-backend.onrender.com/api/",
      },
      {
        url: "http://localhost:3000/api/",
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  security: {
    bearerAuth: [],
  },
  apis: ["./routes/api/*.js"],
};

module.exports = options;
