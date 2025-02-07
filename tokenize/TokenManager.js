const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "12h", //jangan lupa ganti expired
  });
  return token;
};

module.exports = { generateToken };
