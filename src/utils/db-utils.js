const typeorm = require("typeorm");
const dbConfig = require("../config/ormconfig.json");
const UserInfo = require("../entity/user-info");
const UserRoles = require("../entity/user-roles");
const UserTypes = require("../entity/user-types");

exports.connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    typeorm
      .createConnection(dbConfig)
      .then((connection) => resolve(connection))
      .catch((err) => reject(err));
  });
};

exports.isConnected = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(typeorm.getConnection().isConnected);
    } catch (err) {
      reject(err);
    }
  });
};

exports.getConnection = () => {
  try {
    return typeorm.getConnection();
  } catch (err) {
    console.log(err);
  }
};
