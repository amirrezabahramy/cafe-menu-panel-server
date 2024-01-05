const express = require("express");

const router = express.Router();

router.route("/").all((_, res) => {
  res.status(404).send("Route not found.");
});

module.exports = router;
