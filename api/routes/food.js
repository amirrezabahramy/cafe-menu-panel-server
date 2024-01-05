const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authentication");

const Food = require("../models/Food");

const { getAll, add, get, update, remove } = require("../helpers/crud-helpers")(
  Food
);

router.route("/").get(getAll).post(authenticate, add);

router
  .route("/:id")
  .get(authenticate, get)
  .patch(authenticate, update)
  .delete(authenticate, remove);

module.exports = router;
