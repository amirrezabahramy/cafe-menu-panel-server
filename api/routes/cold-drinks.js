const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authentication");

const ColdDrink = require("../models/ColdDrink");

const { getAll, add, get, update, remove } = require("../helpers/crud-helpers")(
  ColdDrink
);

router.route("/").get(getAll).post(authenticate, add);

router
  .route("/:id")
  .get(authenticate, get)
  .patch(authenticate, update)
  .delete(authenticate, remove);

module.exports = router;
