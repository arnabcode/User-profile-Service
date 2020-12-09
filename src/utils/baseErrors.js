"use strict";

class ApplicationError extends Error {
  constructor(props) {
    super(props);
    this.errorCode = props.code;
    this.message = props.message;
  }
}

class DatabaseError extends ApplicationError {}

class UserFacingError extends ApplicationError {}

module.exports = {
  ApplicationError,
  DatabaseError,
  UserFacingError,
};
