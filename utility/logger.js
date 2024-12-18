const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Logging levels: 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console logs
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    // File logs for errors
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // File logs for all logs
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
