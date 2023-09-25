const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const articleRoutes = require("./routes/article");
app.use("/articles", articleRoutes);

mongoose
  .connect(process.env.MONGOOSE_KEY)
  .then((result) => {
    app.listen(3000);
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });
