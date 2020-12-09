var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
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
const UserInfo = require("./src/entity/user-info");
var app = express();
app.set("port", process.env.port || 4003);
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());

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
      stack: err.stack,
    };
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(resp);
  }
});

app.set("port", 4003);
app.listen(app.get("port"));
console.log("Server is running");
