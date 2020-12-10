var createError = require("http-errors");
var express = require("express");

var cors = require("cors");
require("dotenv").config();
const { UserFacingError } = require("./src/utils/baseErrors");
const {
  NotFoundError,
  BadRequestError,
} = require("./src/utils/userFacingErrors");
const { ERROR_CONSTANTS, STATUS_CODES } = require("./src/utils/constants");
const { FailureResponse } = require("./src/object-models/response-model");
const { connectToDatabase } = require("./src/utils/db-utils");
const { logger } = require("./src/utils/logging-utils");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  require("morgan")("combined", {
    stream: {
      write: function (message, encoding) {
        logger.info(message);
      },
    },
  })
);
connectToDatabase()
  .then((connection) => {})
  .catch((err) => {
    console.log("Couldn't connect to db ! exiting ......", err);
    process.exit();
  });

//get all routes for User
require("./src/routes/user-controller")(app);
require("./src/routes/login-controller")(app);
require("./src/routes/roles-controller")(app);

app.get("/", (req, res) => {
  res.send("<h1>User Profile Service</h1>");
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  if (err instanceof UserFacingError) {
    var resp = new FailureResponse(err.code, err.message);
    res.status(STATUS_CODES.INVALID_INPUT).send(resp);
  } else {
    var resp = {
      ...ERROR_CONSTANTS.INTERNAL_SERVER_ERROR,
      info: err.message,
    };
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(resp);
  }
  logger.error(err.message);
});

app.set("port", 4003);
app.listen(app.get("port"));
console.log("Server is running");
