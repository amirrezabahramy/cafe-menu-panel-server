const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../../models/Admin");

router.route("/").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const [admin] = await Admin.find({ username, password });
    if (!admin) {
      throw new Error("Username or password is incorrect.");
    }
    const accessToken = generateAccessToken(JSON.parse(JSON.stringify(admin)));
    console.log(accessToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.APP_ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.APP_ACCESS_TOKEN_SECRET);
