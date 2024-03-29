const logger = require('../utility/logger.util')

const errorMiddleware = (err, req, res, next) => {
    // Log the error for debugging purposes
    logger.error(`[Error]: ${err.message}`);
  
    // You can determine the status code based on the type of error
    // This is a basic example, you might want to customize it
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    // Send a generic response or customize it based on the error type or status code
    res.send({
      message: err.message,
      // Include the stack trace only in development mode for debugging purposes
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  
  module.exports = errorMiddleware;
  