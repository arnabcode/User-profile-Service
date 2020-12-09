const { UserFacingError } = require("./baseErrors");

class BadRequestError extends UserFacingError {
  constructor({ message, code }) {
    super(message, code);
    this.message = message;
    this.code = code;
  }

  get statusCode() {
    return this.code;
  }

  get message() {
    return this.message;
  }

  get httpStatusCode() {
    return 400;
  }
}

class NotFoundError extends UserFacingError {
  constructor(message, options = {}) {
    super(message);

    // You can attach relevant information to the error instance
    // (e.g.. the username)

    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }
  get statusCode() {
    return 404;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
};
