const UserInfoRepo = require("../respository/user-info-repo");
const uniqid = require("uniqid");
const { CONSTANTS, USER_ROLES } = require("../common/constants");
const { sendMessageToUserProfileQueue } = require("../utils/sqs-utils");
const { logger } = require("../utils/logging-utils");
var { UserModel } = require("../models/UserModel");

exports.addNewUser = (req, res, next) => {
  var user = new UserModel(req.body.user);
  logger.info(`Recieved request at add user  :  ${JSON.stringify(user)}`);
  user.userId = uniqid(CONSTANTS.USER_ID_PREFIX);
  user.userType = USER_ROLES.SUBSCRIBER;

  UserInfoRepo.addUser(user)
    .then((user) => {
      sendMessageToUserProfileQueue(user).then((messageId) => {
        logger.info(`Sent message with Id :  ${messageId}`);
        logger.info(
          `Sending response at add user  :  ${JSON.stringify(user.userId)}`
        );
        res.status(200).send({ userId: user.userId });
      });
    })
    .catch((err) => next(err));
};

exports.getAllUsers = (req, res, next) => {
  logger.info(`Recieved request at Get all users `);
  UserInfoRepo.getUsers()
    .then((users) => {
      logger.info(
        `Sending response at Get all users  :  ${JSON.stringify(users)}`
      );
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};

exports.updateUserByUserId = (req, res, next) => {
  var user = req.body.user;
  logger.info(`Recieved request at Update user  :  ${JSON.stringify(user)}`);
  UserInfoRepo.updateUser(req.params.userId, user)
    .then((userId) => {
      logger.info(
        `Sending response at Update user :  ${JSON.stringify(userId)}`
      );
      res.status(200).send({ userId });
    })
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
  logger.info(
    `Recieved request at Get By authId  :  ${JSON.stringify(req.params.authId)}`
  );
  UserInfoRepo.getUserByAuthId(req.params.authId)
    .then((user) => {
      logger.info(
        `Sending response at Get By authId  :  ${JSON.stringify(user)}`
      );
      res.status(200).send({ user });
    })
    .catch((err) => next(err));
};
