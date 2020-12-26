"use strict";

class ApplicationError extends Error {
  constructor(code, message) {
    super({ code, message });
    this.code = code;
    this.message = message;
  }

  get httpStatusCode() {
    return 501;
  }
}

class DatabaseError extends ApplicationError {}

class UserFacingError extends ApplicationError {}

module.exports = {
  ApplicationError,
  DatabaseError,
  UserFacingError,
};
