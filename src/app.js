"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes = require("./routes/index-routes");
const drugRoutes = require("./routes/drug-routes");
const userRoutes = require("./routes/user-routes");
const prescriptionRoutes = require("./routes/prescription-routes");
const customerRoutes = require("./routes/customer-routes");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const Sequelize = require("sequelize");

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser({ limit: "4MB" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/auth", authRoutes);
app.use("/drugs", drugRoutes);
app.use("/prescriptions", prescriptionRoutes);

app.use((error, req, res, next) => {
  let status = error.status || 500;

  if (error instanceof Sequelize.BaseError) {
      status = 400;
  }

  res.status(status).send({
    error: {
      status: status,
      message: error.message || "Internal Server Error",
    },
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

module.exports = app;
