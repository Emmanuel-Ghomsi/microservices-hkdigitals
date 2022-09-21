const express = require("express");

// env port
const { PORT } = require("./config");

// get the database connection instance
const { databaseConnection } = require("./database");

// get the express app instance
const expressApp = require("./express-app");

const StartServer = async () => {
  const app = express();

  // connect to the database
  await databaseConnection();

  // start express app
  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
