const express = require("express");
const cors = require("cors");

const { image } = require("./api");

const HandleErrors = require("./utils/error-handler");

// get the swagger definition
const swaggerDefinition = require("./swagger/swagger-definition");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  app.use("/uploads", express.static("uploads"));

  // load swagger definition
  await swaggerDefinition(app);

  //api
  image(app);

  // error handling
  app.use(HandleErrors);
};
