const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountKey.json");
const { UnauthorizedError } = require("../common/userFacingErrors");
const { ERROR_CONSTANTS } = require("../common/constants");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRE_DB,
});

exports.isAuthenticated = (req, res, next) => {
  if (req.headers.token) {
    admin
      .auth()
      .verifyIdToken(req.headers.token)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch((err) => {
        console.log(err.errorInfo);
        next(new UnauthorizedError(err.errorInfo.code, err.errorInfo.message));
      });
  } else {
    var { code, message } = ERROR_CONSTANTS.MISNG_TOKEN;
    next(new UnauthorizedError(code, message));
  }
};
