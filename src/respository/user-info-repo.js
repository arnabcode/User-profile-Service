var { getConnection } = require("../utils/db-utils");
var UserInfo = require("../entity/user-info");
const { logger } = require("../utils/logging-utils");

exports.addUser = (newUser) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserInfo)
      .save(newUser)
      .then((user) => {
        logger.info(`User saved successfully : ${user}`);
        resolve(user);
      })
      .catch((err) => reject(err));
  });
};

exports.getUser = (userId) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserInfo)
      .findOne(userId)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserInfo)
      .find()
      .then((users) => resolve(users))
      .catch((err) => reject(err));
  });
};

exports.updateUser = (userId, user) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserInfo)
      .update(userId, { ...user })
      .then((user) => resolve(user.userId))
      .catch((err) => reject(err));
  });
};

exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserInfo)
      .update(userId, { status: "N" })
      .then((user) => resolve(user.userId))
      .catch((err) => reject(err));
  });
};
