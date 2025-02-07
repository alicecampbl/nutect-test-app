const ClientError = require("../exceptions/ClientError");

const errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || null,
    message: err.message,
    data: null,
  });
};

module.exports = errorMiddleware;
