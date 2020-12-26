var { getConnection } = require("../utils/db-utils");
var UserType = require("../entity/user-types");

exports.addUserType = (newUserType) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserType)
      .save(newUserType)
      .then((userType) => resolve(userType))
      .catch((err) => reject(err));
  });
};

exports.getUserType = (typeId) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserType)
      .findOne(typeId)
      .then((userType) => resolve(userType))
      .catch((err) => reject(err));
  });
};

exports.getUserTypes = () => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserType)
      .find()
      .then((userTypes) => resolve(userTypes))
      .catch((err) => reject(err));
  });
};

exports.updateUserType = (typeId, userType) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserType)
      .update(typeId, { ...userType })
      .then((typeId) => resolve(typeId))
      .catch((err) => reject(err));
  });
};

exports.deleteUserType = (typeId) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserType)
      .update(typeId, { status: "N" })
      .then((typeId) => resolve(typeId))
      .catch((err) => reject(err));
  });
};
