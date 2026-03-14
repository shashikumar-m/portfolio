const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Visitor", visitorSchema);