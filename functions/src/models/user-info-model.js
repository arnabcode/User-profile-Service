class UserInfo {
  constructor(user) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.status = status;
    this.userType = userType;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.lastLogin = lastLogin;
  }
}

module.exports = {
  UserInfo: UserInfo,
};
