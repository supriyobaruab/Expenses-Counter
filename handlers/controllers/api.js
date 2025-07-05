const transationSchema = require("../../schema/transationSchema");
const userSchema = require("../../schema/userSchema");

async function api_get(req, res) {
  try {
    const userid = req.user;
    const information = await transationSchema
      .find({ userid: userid })
      .sort({ _id: -1 })
      .populate("userid");
    res.status(200).json(information);
  } catch (error) {
    res.json(error);
  }
}
async function api_post(req, res) {
  try {
    const { type, amount, accntType, description } = req.body;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-CA");

    const trans = new transationSchema({
      userid: req.user,
      type,
      amount,
      accntType,
      description,
      date: formattedDate,
    });

    await trans.save();
    res.redirect("/");
  } catch (error) {
    res.json(error);
  }
}

module.exports = { api_get, api_post };
