const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const firebase = require("firebase").default;
const firebaseConfig = require("./firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRE_DB,
});

firebase.initializeApp(firebaseConfig);

exports.isAuthenticated = (req, res, next) => {
  if (req.headers.token) {
    admin
      .auth()
      .verifyIdToken(req.headers.token)
      .then((data) => {
        res.status(200).send({ message: data });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(401).send({ message: "Token missing" });
  }
};

exports.checkForAuthentication = (req, res, next) => {
  if (req.headers.token) {
    admin
      .auth()
      .verifyIdToken(req.headers.token)
      .then((user) => {
        console.log(res.data);
        admin
          .auth()
          .revokeRefreshTokens(user.uid)
          .then(() => {
            res.status(200).send({ message: "success" });
          })
          .catch((err) => next(err));
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

exports.createUser = (req, res, next) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(({ user }) => {
      user
        .getIdToken()
        .then((token) => res.status(200).send({ token }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
