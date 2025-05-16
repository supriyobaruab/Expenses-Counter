const express = require("express");
const app = express();
const mongoose = require("mongoose");
const schema = require("./schema");

// Middleware to parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// Optional: Also parse JSON if needed
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/api", async (req, res) => {
  const info = await schema.find();
  res.json(info);
});
app.post("/api", async (req, res) => {
  const { type, amount, accntType, description } = req.body;
  const data = new schema({
    type,
    amount,
    accntType,
    description,
  });
  data.save();
  res.redirect("/");
});

async function dataBase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/income-expenses");
    console.log("Database Connected");
  } catch (error) {
    console.log("Database failed to connect");
  }
}
dataBase();
app.listen(3000, () => {
  console.log("Server is running on 3000");
});
