const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

const devErrorLogger = () => {
  const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });
  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      devFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "devErrorLogger.log" }),
    ],
  });
};

module.exports = devErrorLogger;
