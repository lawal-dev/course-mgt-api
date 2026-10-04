import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  apis: [path.join(__dirname, "../modules/**/*.route.js")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log(JSON.stringify(swaggerSpec, null, 2));

export default swaggerSpec;

// import swaggerJSDoc from "swagger-jsdoc";

// const options = {
//   definition: {
//     openapi: "3.0.0",

//     info: {
//       title: "Course Management API",
//       version: "1.0.0",
//     },

//     paths: {
//       "/test": {
//         get: {
//           summary: "Test endpoint",
//           responses: {
//             200: {
//               description: "Success",
//             },
//           },
//         },
//       },
//     },
//   },

//   apis: [],
// };

// const swaggerSpec = swaggerJSDoc(options);

// console.log(JSON.stringify(swaggerSpec, null, 2));

// export default swaggerSpec;
