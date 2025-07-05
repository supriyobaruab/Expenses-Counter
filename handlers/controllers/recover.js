const bcrypt = require("bcrypt"); // Optional, but recommended
const userSchema = require("../../schema/userSchema");

async function recover_get(req, res) {
  try {
    res.render("password", { showpassword: false });
  } catch (error) {
    res.json(error);
  }
}

async function recover_post(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.render("password", {
        error: "No User Found",
        showpassword: false,
      });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      return res.redirect("/login");
    }
    res.render("password", {
      error: undefined,
      showpassword: true,
      email: email,
    });
  } catch (error) {
    res.json(error);
  }
}

module.exports = { recover_get, recover_post };
