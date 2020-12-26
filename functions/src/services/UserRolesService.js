const UserRolesRepo = require("../respository/user-roles-repo");

exports.addNewUserRole = (req, res, next) => {
  var { userRole } = req.body;
  UserRolesRepo.addUserRole(userRole)
    .then((userRole) => {
      res.status(200).send({ roleCode: userRole.roleCode });
    })
    .catch((err) => next(err));
};

exports.getAllUserRoles = (req, res, next) => {
  UserRolesRepo.getUserRoles()
    .then((userRoles) => {
      res.status(200).send({ userRoles });
    })
    .catch((err) => next(err));
};

exports.updateUserRoleByUserRolecode = (req, res, next) => {
  var userRole = req.body.userRole;

  UserRolesRepo.updateUserRole(req.params.roleCode, userRole)
    .then((userId) => res.status(200).send({ roleCode }))
    .catch((err) => next(err));
};

exports.getUserRoleByRoleCode = (req, res, next) => {
  UserRolesRepo.getUser(req.params.roleCode)
    .then((userRole) => res.status(200).send({ userRole }))
    .catch((err) => next(err));
};

exports.deleteUserRoleByRoleCode = (req, res, next) => {
  UserRolesRepo.deleteUser(req.params.roleCode)
    .then((roleCode) => res.status(200).send({ roleCode }))
    .catch((err) => next(err));
};
