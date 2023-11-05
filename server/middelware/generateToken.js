const jwt = require("jsonwebtoken");

async function generateToken(payload, res) {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

module.exports = generateToken;
