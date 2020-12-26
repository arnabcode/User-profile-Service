var { getConnection, connectToDatabase } = require("../utils/db-utils");
var UserInfo = require("../entity/user-info");
const { logger } = require("../utils/logging-utils");
const { DatabaseError } = require("../common/baseErrors");
const { NotFoundError } = require("../common/userFacingErrors");
const { CONSTANTS, ERROR_CONSTANTS } = require("../common/constants");

exports.addUser = (newUser) => {
  const userInfoRepository = global.connection.getRepository(UserInfo);

  return new Promise((resolve, reject) => {
    userInfoRepository
      .save(newUser)
      .then((user) => {
        logger.info(`User saved successfully : ${user}`);
        resolve(user);
      })
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.getUser = (userId) => {
  const userInfoRepository = global.connection.getRepository(UserInfo);

  return new Promise((resolve, reject) => {
    userInfoRepository
      .findOne(userId)
      .then((user) => resolve(user))
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.getUsers = () => {
  const userInfoRepository = global.connection.getRepository(UserInfo);
  return new Promise((resolve, reject) => {
    userInfoRepository
      .find({ status: CONSTANTS.ACTIVE_STATUS })
      .then((users) => {
        if (users) {
          resolve(users);
        } else {
          var { code, message } = ERROR_CONSTANTS.NOT_FOUND_ERROR;
          reject(new NotFoundError(code, message));
        }
      })
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.updateUser = (userId, user) => {
  const userInfoRepository = global.connection.getRepository(UserInfo);
  return new Promise((resolve, reject) => {
    userInfoRepository
      .update(userId, { ...user })
      .then((user) => {
        if (user.affected > 0) {
          resolve(userId);
        } else {
          var { code, message } = ERROR_CONSTANTS.NOT_FOUND_ERROR;
          reject(new NotFoundError(code, message));
        }
      })
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.deleteUser = (userId) => {
  const userInfoRepository = global.connection.getRepository(UserInfo);
  return new Promise((resolve, reject) => {
    userInfoRepository
      .update(userId, { status: "N" })
      .then((user) => {
        if (user.affected > 0) {
          resolve(userId);
        } else {
          var { code, message } = ERROR_CONSTANTS.NOT_FOUND_ERROR;
          reject(new NotFoundError(code, message));
        }
      })
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.getUserByAuthId = (authId) => {
  const userInfoRepository = global.connection.getRepository(UserInfo);
  return new Promise((resolve, reject) => {
    userInfoRepository
      .find({ authId: authId })
      .then((user) => {
        if (user) {
          resolve(user);
        } else {
          var { code, message } = ERROR_CONSTANTS.NOT_FOUND_ERROR;
          reject(new NotFoundError(code, message));
        }
      })
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};
