const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

var express = require("express");
var cors = require("cors");
require("dotenv").config();
const {
  UserFacingError,
  ApplicationError,
} = require("./src/common/baseErrors");
const {
  NotFoundError,
  BadRequestError,
} = require("./src/common/userFacingErrors");
const { ERROR_CONSTANTS, STATUS_CODES } = require("./src/common/constants");
const { FailureResponse } = require("./src/models/response-model");
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
  .then((connection) => {
    logger.info("Connected to Database");
    return null;
  })
  .catch((err) => {
    console.log("Couldn't connect to db ! exiting ......\n", err);
    //process.exit();
  });

//get all routes for User
require("./src/routes/user-controller")(app);
require("./src/routes/login-controller")(app);
require("./src/routes/roles-controller")(app);

app.get("/", (req, res) => {
  res.send("<h1>User Profile Service</h1>");
});

app.use(function (req, res, next) {
  next(
    new NotFoundError(
      ERROR_CONSTANTS.NOT_FOUND_ERROR.code,
      ERROR_CONSTANTS.NOT_FOUND_ERROR.message
    )
  );
});

app.use(function (err, req, res, next) {
  var resp;
  if (err instanceof ApplicationError) {
    resp = {
      code: err.code,
      message: err.message,
    };

    res.status(err.httpStatusCode).send(resp);
  } else {
    resp = {
      code: err.code,
      message: err.message,
    };

    res.status(500).send(resp);
  }

  logger.error({ code: err.code, message: err.message, stack: err.stack });
});

exports.userProfileService = functions.https.onRequest(app);
