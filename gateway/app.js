const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const dotEnv = require("dotenv");
dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.USER_SERVICE_HOST);

app.use("/user", proxy(`${process.env.USER_SERVICE_HOST}`));
app.use("/resume", proxy(`${process.env.RESUME_SERVICE_HOST}`));

app.listen(process.env.PORT, () => {
  console.log(`Gateway is Listening to Port ${process.env.PORT}`);
});
