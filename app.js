const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv").config();
const handler = require("./handlers/handler");
const cookie = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.set("view engine", "ejs");
app.use("/", handler);
app.use(express.static("public"));
async function connect_database() {
  try {
    await mongoose.connect("mongodb://localhost:27017/hisab");
    console.log("Database connected");
  } catch (error) {
    console.log("Datbase failed to connect");
  }
}
connect_database();
app.listen(3000, () => {
  console.log("Server running");
});
