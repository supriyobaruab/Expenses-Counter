const { login_get, login_post } = require("./controllers/login");
const { signup_get, signup_post } = require("./controllers/signup");
const { api_get, api_post } = require("./controllers/api");
const { recover_get, recover_post } = require("./controllers/recover");
const express = require("express");
const router = express.Router();
const check_authentication = require("../middleware/checkAuthentication");
const logout = require("./controllers/logout");

router.get("/", check_authentication, (req, res) => {
  res.render("index", { name: req.usern });
});
router.get("/login", login_get);
router.get("/recover", recover_get);
router.get("/api", check_authentication, api_get);
router.get("/signup", signup_get);
router.post("/login", login_post);
router.post("/signup", signup_post);
router.post("/recover", recover_post);
router.post("/logout", logout);
router.post("/api", check_authentication, api_post);
module.exports = router;
