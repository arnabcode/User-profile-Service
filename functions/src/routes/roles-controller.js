const {
  addNewUserRole,
  getAllUserRoles,
  getUserRoleByRoleCode,
  updateUserRoleByUserRolecode,
  deleteUserRoleByRoleCode,
} = require("../services/UserRolesService");

module.exports = (app) => {
  app.get("/v1/user-roles", getAllUserRoles);

  app.get("/v1/user-role/:roleCode", getUserRoleByRoleCode);

  app.put("/v1/user-role/:roleCode", updateUserRoleByUserRolecode);

  app.post("/v1/user-role", addNewUserRole);

  app.delete("/v1/user-role/:roleCode", deleteUserRoleByRoleCode);
};
