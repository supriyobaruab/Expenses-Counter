const jwt = require("jsonwebtoken");
async function checkAuthentication(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  const value = jwt.verify(token, "amitumiaramra");
  if (!value) {
    return res.redirect("/login");
  }
  req.userId = value.id;
  // console.log(req.userId);
  next();
}
module.exports = checkAuthentication;
