const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

const User = require("../../models/User");

router.route("/").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await User.find({ username });
    if (!user) {
      throw new Error("User not found.");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Password is incorrect.");
    }
    const accessToken = generateAccessToken(JSON.parse(JSON.stringify(user)));
    console.log(accessToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send(error.message);
  }
});

module.exports = router;

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.APP_ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.APP_ACCESS_TOKEN_SECRET);
