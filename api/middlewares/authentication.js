const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed.");
    }
    jwt.verify(token, process.env.APP_ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        throw new Error("Token is not valid.");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = authenticate;
