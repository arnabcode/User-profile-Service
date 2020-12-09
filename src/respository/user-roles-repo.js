var { getConnection } = require("../utils/db-utils");
var UserRole = require("../entity/user-roles");

exports.addUserRole = (newUserRole) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .save(newUserRole)
      .then((userRole) => resolve(userRole))
      .catch((err) => reject(err));
  });
};

exports.getUserRole = (roleCode) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .findOne(roleCode)
      .then((userRole) => resolve(userRole))
      .catch((err) => reject(err));
  });
};

exports.getUserRoles = () => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .find()
      .then((userRoles) => resolve(userRoles))
      .catch((err) => reject(err));
  });
};

exports.updateUserRole = (roleCode, userRole) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .update(roleCode, { ...userRole })
      .then((roleCode) => resolve(roleCode))
      .catch((err) => reject(err));
  });
};

exports.deleteUserRole = (roleCode) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .update(roleCode, { status: "N" })
      .then((roleCode) => resolve(roleCode))
      .catch((err) => reject(err));
  });
};
