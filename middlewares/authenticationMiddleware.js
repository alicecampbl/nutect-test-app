const AuthenticationError = require("../exceptions/AuthenticationError");
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new AuthenticationError("Token tidak ditemukan!", 102));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
    if (err)
      return next(
        new AuthenticationError("Token tidak valid atau kadaluwarsa", 108)
      );

    req.email = data.email;
  });

  next();
};

module.exports = authenticateToken;
