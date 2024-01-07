const express = require("express");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

router.route("/").all((_, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Route not found.");
});

module.exports = router;
