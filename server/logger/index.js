const devErrorLogger = require("./devErrorLogger");

let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = devErrorLogger();
}

module.exports = logger;
