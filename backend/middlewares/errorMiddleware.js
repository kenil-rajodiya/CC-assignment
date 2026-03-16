/**
 * Error handling middleware
 * Centralized error handler for all routes
 */
export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] Status: ${status}, Message: ${message}`);
  console.error(err.stack);

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};

/**
 * 404 Not Found middleware
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
