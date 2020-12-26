const { CONSTANTS } = require("../common/constants");

class UserModel {
  constructor(user) {
    this.email = user.email || "";
    this.firstName = user.firstName || "";
    this.lastName = user.lastName || "";
    this.userType = user.userType || "";
    this.authId = user.authId;
    this.dob = user.dob || null;
    this.status = CONSTANTS.ACTIVE_STATUS;
    this.createdOn = new Date();
    this.modifiedOn = new Date();
    this.lastLogin = new Date();
  }

  getModifieduser(user) {
    return {
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      userType: user.userType || "",
      dob: user.dob || null,
      modifiedOn: new Date(),
    };
  }
}

module.exports = { UserModel };
