const jwt = require("jsonwebtoken");
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
async function check_authentication(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }
    const verify = jwt.verify(token, "amitumiaramra");
    const userid = verify.id;
    const username = verify.username;
    req.user = userid;
    const name = username.split(" ")[0];
    const capital_name = capitalizeFirstLetter(name);
    req.usern = capital_name;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = check_authentication;
