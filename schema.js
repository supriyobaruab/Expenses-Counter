const mongoose = require("mongoose");
const schema = new mongoose.Schema({
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
});
module.exports = mongoose.model("expenses", schema);
