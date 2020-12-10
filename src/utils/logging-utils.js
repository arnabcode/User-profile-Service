var winston = require("winston");
require("winston-loggly-bulk");

var logglyConfig = require("../config/logglyConfig.json");

exports.logger = winston.createLogger({
  transports: [
    new winston.transports.Loggly(logglyConfig),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});
