const UserInfoRepo = require("../respository/user-info-repo");
const uniqid = require("uniqid");
const { CONSTANTS } = require("../utils/constants");
const { sendMessageToUserProfileQueue } = require("../utils/sqs-utils");
const { logger } = require("../utils/logging-utils");

exports.addNewUser = (req, res, next) => {
  var { user } = req.body;
  user.userId = uniqid(CONSTANTS.USER_ID_PREFIX);
  user.status = CONSTANTS.ACTIVE_STATUS;
  user.createdOn = new Date();
  user.modifiedOn = new Date();
  user.lastLogin = new Date();

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
  user.modifiedOn = new Date();

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
