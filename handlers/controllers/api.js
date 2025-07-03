const transationSchema = require("../../schema/transationSchema");
const userSchema = require("../../schema/userSchema");

async function api_get(req, res) {
  try {
    const userid = req.user;
    const information = await transationSchema
      .find({ userid: userid })
      .populate("userid");
    res.status(200).json(information);
  } catch (error) {
    res.json(error);
  }
}
async function api_post(req, res) {
  try {
    const { type, amount, accntType, description } = req.body;
    const trans = new transationSchema({
      userid: req.user,
      type: type,
      amount: amount,
      accntType: accntType,
      description: description,
    });
    await trans.save();
    res.redirect("/");
  } catch (error) {}
}

module.exports = { api_get, api_post };
