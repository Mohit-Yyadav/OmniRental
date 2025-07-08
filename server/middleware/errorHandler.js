// server/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error Middleware:", err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
