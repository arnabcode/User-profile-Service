const { UserFacingError } = require("./baseErrors");

class BadRequestError extends UserFacingError {
  constructor(code, message) {
    super({ message, code });
    this.message = message;
    this.code = code;
  }

  get code() {
    return this.code;
  }
}

class NotFoundError extends UserFacingError {
  constructor(code, message, options = {}) {
    super(message, code);

    // You can attach relevant information to the error instance
    // (e.g.. the username)

    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }
  get httpStatusCode() {
    return 404;
  }
}

class InternalServerError extends UserFacingError {
  constructor(code, message, options = {}) {
    super(message, code);

    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }

  get httpStatusCode() {
    return 500;
  }
}

class UnauthorizedError extends UserFacingError {
  constructor(code, message, options = {}) {
    super(message, code);

    // You can attach relevant information to the error instance
    // (e.g.. the username)

    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }
  get httpStatusCode() {
    return 401;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
};
