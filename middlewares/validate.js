// import { AppError } from "../utils/AppError.js";

// export const validate = (schema, location) => {
//   return (req, res, next) => {
//     const result = schema.safeParse(req[location]);

//     if (!result.success) {
//       const errors = {};

//       result.error.issues.forEach((issue) => {
//         const field = issue.path[0];

//         errors[field] = issue.message;
//       });

//       return next(new AppError("Validation failed", 400, errors));
//     }
//     req[location] = result.data;
//     next();
//   };
// };

import { AppError } from "../utils/AppError.js";

export const validate = (schema, location) => {
  return (req, res, next) => {
    const result = schema.safeParse(req[location]);

    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        errors[field] = issue.message;
      });

      return next(new AppError("Validation failed", 400, errors));
    }

    req[location] = result.data;

    next();
  };
};
