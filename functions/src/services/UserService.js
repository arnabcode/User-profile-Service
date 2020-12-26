const UserInfoRepo = require("../respository/user-info-repo");
const uniqid = require("uniqid");
const { CONSTANTS, USER_ROLES } = require("../common/constants");
const { sendMessageToUserProfileQueue } = require("../utils/sqs-utils");
const { logger } = require("../utils/logging-utils");
var { UserModel } = require("../models/UserModel");

exports.addNewUser = (req, res, next) => {
  var user = new UserModel(req.body.user);

  user.userId = uniqid(CONSTANTS.USER_ID_PREFIX);
  user.userType = USER_ROLES.SUBSCRIBER;

  UserInfoRepo.addUser(user)
    .then((user) => {
      sendMessageToUserProfileQueue(user).then((messageId) => {
        logger.info(`Sent message with Id :  ${messageId}`);
        res.status(200).send({ userId: user.userId });
      });
    })
    .catch((err) => next(err));
};

exports.getAllUsers = (req, res, next) => {
  UserInfoRepo.getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};

exports.updateUserByUserId = (req, res, next) => {
  var user = req.body.user;

  UserInfoRepo.updateUser(req.params.userId, user)
    .then((userId) => res.status(200).send({ userId }))
    .catch((err) => next(err));
};

exports.getUserByUserId = (req, res, next) => {
  UserInfoRepo.getUser(req.params.userId)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => next(err));
};

exports.deleteUser = (req, res, next) => {
  UserInfoRepo.deleteUser(req.params.userId)
    .then((userId) => res.status(200).send({ userId }))
    .catch((err) => next(err));
};

exports.getUserByAuthIdService = (req, res, next) => {
  UserInfoRepo.getUserByAuthId(req.params.authId)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => next(err));
};
