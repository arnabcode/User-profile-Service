var { getConnection } = require("../utils/db-utils");
var UserRole = require("../entity/user-roles");
const { DatabaseError } = require("../common/baseErrors");

exports.addUserRole = (newUserRole) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .save(newUserRole)
      .then((userRole) => resolve(userRole))
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.getUserRole = (roleCode) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .findOne(roleCode)
      .then((userRole) => resolve(userRole))
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.getUserRoles = () => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .find()
      .then((userRoles) => resolve(userRoles))
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.updateUserRole = (roleCode, userRole) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .update(roleCode, { ...userRole })
      .then((roleCode) => resolve(roleCode))
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};

exports.deleteUserRole = (roleCode) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .getRepository(UserRole)
      .update(roleCode, { status: "N" })
      .then((roleCode) => resolve(roleCode))
      .catch((err) => reject(new DatabaseError(err.code, err.message)));
  });
};
