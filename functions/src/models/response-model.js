class SuccessResponse {
  constructor(code, message, data) {
    this.statusCode = code;
    this.message = message;
    this.data = data;
  }

  static toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}

class FailureResponse {
  constructor(code, message) {
    this.statusCode = code;
    this.message = message;
  }

  static toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

module.exports = { SuccessResponse, FailureResponse };
