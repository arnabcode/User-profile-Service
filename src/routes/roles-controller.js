const {
  addNewUserRole,
  getAllUserRoles,
  getUserRoleByRoleCode,
  updateUserRoleByUserRolecode,
  deleteUserRoleByRoleCode,
} = require("../services/UserRolesService");

module.exports = (app) => {
  app.get("/user-roles", getAllUserRoles);

  app.get("/user-role/:roleCode", getUserRoleByRoleCode);

  app.put("/user-role/update/:roleCode", updateUserRoleByUserRolecode);

  app.post("/user-role/add", addNewUserRole);

  app.delete("/user-role/delete/:roleCode", deleteUserRoleByRoleCode);
};
