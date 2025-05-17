const express = require("express");
const app = express();
const mongoose = require("mongoose");
const transationSchema = require("./transationSchema");
const userSchema = require("./userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const cors = require("cors");
const checkAuthentication = require("./middleware/checkAuthentication");
let user;

// Middleware to parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// Optional: Also parse JSON if needed
app.use(express.json());
app.use(cookie());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.get("/", checkAuthentication, (req, res) => {
  res.render("index");
  user = req.userId;
});
app.get("/api", async (req, res) => {
  const info = await transationSchema.find({ userid: user });
  // console.log(user);
  // console.log(info);
  res.json(info);
});
app.get("/login", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect("/");
  }
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    email = email.toLowerCase();
    password = await bcrypt.hash(password, salt);
    const user = new userSchema({
      username,
      email,
      password,
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.send("No user found please signup");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  console.log(isMatched);
  if (!isMatched) {
    return res.send("wrong password");
  }
  const payload = { id: user._id, email };
  // console.log(payload);
  const token = jwt.sign(payload, "amitumiaramra");
  res.cookie("token", token);
  res.redirect("/");
});

app.post("/api", async (req, res) => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    hour12: true, // or true for 12-hour format
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const { type, amount, accntType, description } = req.body;
  const data = new transationSchema({
    userid: user,
    type,
    amount,
    accntType,
    description,
    date,
  });
  await data.save();
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
