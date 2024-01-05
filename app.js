const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Configuring routes
app.use("/api/v1", require("./api/routes"));
app.use("*", require("./api/routes/not-found"));

// Dotenv
dotenv.config();

// Connecting to database
const { MONGODB_URL } = process.env;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log(`Failed to connect. Reason: ${error.message}`);
  });

// Starting server
const APP_PORT = process.env.APP_PORT || 3000;
app.listen(APP_PORT, () => {
  console.log(`Server started on port: ${APP_PORT}`);
});
