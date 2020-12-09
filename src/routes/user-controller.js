const {
  addNewUser,
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  deleteUser,
} = require("../services/UserService");

module.exports = (app) => {
  app.get("/users", getAllUsers);

  app.get("/user/:userId", getUserByUserId);

  app.put("/user/update/:userId", updateUserByUserId);

  app.post("/user/add", addNewUser);

  app.delete("/user/delete/:userId", deleteUser);
};

// module.exports = router;
