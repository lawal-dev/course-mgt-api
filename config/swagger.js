import swaggerJSDoc from "swagger-jsdoc";
import { globSync } from "glob";

const routeFiles = globSync("modules/**/*.route.js", {
  cwd: process.cwd(),
  absolute: true,
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Course Management API",
      version: "1.0.0",
      description: "API documentation for the Course Management System",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },

  apis: routeFiles,

  failOnErrors: true,
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;