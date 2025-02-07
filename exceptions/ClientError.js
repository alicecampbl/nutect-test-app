class ClientError extends Error {
  constructor(message, status, statusCode = 400) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.name = "ClientError";
  }
}

module.exports = ClientError;
