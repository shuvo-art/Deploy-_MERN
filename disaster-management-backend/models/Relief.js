const mongoose = require("mongoose");

const reliefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Relief", reliefSchema);
