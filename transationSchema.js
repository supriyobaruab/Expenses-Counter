const mongoose = require("mongoose");
const user = require("./userSchema");
const schema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  accntType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});
module.exports = mongoose.model("expenses", schema);
