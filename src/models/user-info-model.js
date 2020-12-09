class UserInfo {
  constructor(
    userId,
    email,
    firstName,
    lastName,
    dob,
    status,
    userType,
    createdOn,
    modifiedOn,
    lastLogin
  ) {
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
