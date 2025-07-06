const user = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login_get(req, res) {
  try {
    res.render("login");
  } catch (error) {}
}
async function login_post(req, res) {
  try {
    const { email, password } = req.body;
    const person = await user.findOne({ email });
    if (!person) {
      return res.render("login", { error: "User not found" });
    }
    const hashed_password = await bcrypt.compare(password, person.password);
    if (!hashed_password) {
      return res.render("login", { error: "Wrong password" });
    }
    const token = jwt.sign(
      { username: person.username, id: person._id },
      "amitumiaramra"
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = { login_get, login_post };
