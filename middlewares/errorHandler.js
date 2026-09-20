export const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }
  return res.status(500).json({
    status: 500,
    success: false,
    message: "Internal Server Error",
    ...(err.errors && { errors: err.errors }),
  });
};
