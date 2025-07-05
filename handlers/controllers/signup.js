const user = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
async function signup_post(req, res) {
  const { username, email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const person = new user({
      username: username,
      email: email,
      password: hashed_password,
    });
    await person.save();
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .render("signup", { error: "Email already in use" });
    }
    res
      .status(500)
      .render("signup", { error: "Server error. Please try again." });
  }
}
async function signup_get(req, res) {
  try {
    res.render("signup");
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = { signup_get, signup_post };
