const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv").config();
const handler = require("./handlers/handler");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(express.json());
app.set("view engine", "ejs");
app.use("/", handler);
app.use(express.static("public"));
async function connect_database() {
  try {
    const database = process.env.DATABASE;
    await mongoose.connect(database);
    console.log("Database connected");
  } catch (error) {
    console.log("Datbase failed to connect");
  }
}
connect_database();
const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log("Server running");
});
