import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routeFiles = globSync(
  path.resolve(__dirname, "../modules/**/*.route.js"),
);

console.log("Swagger route files:");
console.log(routeFiles);

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

console.log(JSON.stringify(swaggerSpec, null, 2));

export default swaggerSpec;
