const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./nlp/categoryRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/category", categoryRoutes);
// app.get("/api/keyword", function (req, res) {});
app.get("/", (req, res) => {
  res.send({ message: "hello" });
});
app.listen(5000);
