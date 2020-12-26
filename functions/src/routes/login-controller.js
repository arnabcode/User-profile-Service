const keys = require("../../config/keys");
const {
  isAuthenticated,
  createUser,
  checkForAuthentication,
} = require("../utils/googleUtils");

module.exports = (app) => {
  //app.post("/register", createUser);
  // app.get("/authenticated", isAuthenticated, (req, res, next) => {
  //   console.log(res.locals.user);
  //   res.status(200).send({ user: res.locals.user });
  // });
  // app.get("/logout", checkForAuthentication);
};
