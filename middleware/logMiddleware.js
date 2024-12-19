const logger = require('../utility/logger'); // Import Winston logger

const logMiddleware = (req, res, next) => {
  const startTime = Date.now();

  // Log the incoming request
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl} from ${req.ip}`);

  // Measure response time
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(
      `Response: ${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`
    );
  });

  next();
};

module.exports = logMiddleware;
