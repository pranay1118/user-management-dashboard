const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const cors=require('cors');
const Router = require("./router/account");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
app.use('/user',Router)
mongoose
  .connect(uri)
  .then(() => console.log("DB is connected successfully!!"))
  .catch((err) => console.log(err));
app.listen(port, (req, res) => {
  console.log(`app is running on ${port}`);
});
