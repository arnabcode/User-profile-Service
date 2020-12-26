const {
  addNewUser,
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  deleteUser,
  getUserByAuthIdService,
} = require("../services/UserService");
const { isAuthenticated } = require("../utils/googleUtils");

module.exports = (app) => {
  app.get("/v1/users", getAllUsers);

  app.get("/v1/user/:userId", getUserByUserId);
  app.get("/v1/user/auth/:authId", getUserByAuthIdService);

  app.put("/v1/user/:userId", updateUserByUserId);

  app.post("/v1/user", addNewUser);

  app.delete("/v1/user/:userId", deleteUser);
};
