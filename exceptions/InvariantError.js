const ClientError = require("./ClientError");

class InvariantError extends ClientError {
  constructor(message, status) {
    super(message, status, 400);
    this.name = "InvariantError";
  }
}

module.exports = InvariantError;
