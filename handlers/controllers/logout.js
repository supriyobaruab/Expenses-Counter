async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.redirect("/login");
  } catch (error) {
    res.json(error);
  }
}
module.exports = logout;
