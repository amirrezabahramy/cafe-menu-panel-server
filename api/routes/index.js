const express = require("express");

const router = express.Router();

// Open routes
router.use("/auth", require("./auth"));

// Secured routes
router.use("/hot-drinks", require("./hot-drinks"));
router.use("/cold-drinks", require("./cold-drinks"));
router.use("/food", require("./food"));
router.use("/reviews", require("./reviews"));

module.exports = router;
