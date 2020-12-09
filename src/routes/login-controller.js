const passport = require("passport");
var multer = require("multer");
const fs = require("fs");
const keys = require("../config/keys");
const {
  isAuthenticated,
  createUser,
  checkForAuthentication,
} = require("../config/googleUtils");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      var user = { accessToken, profile };
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

module.exports = (app) => {
  app.post("/register", createUser);

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res, next) => {
      res.status(200).send({ token: req.user });
    }
  );

  app.get("/authenticated", isAuthenticated, (req, res, next) => {});

  app.get("/logout", checkForAuthentication);
};
