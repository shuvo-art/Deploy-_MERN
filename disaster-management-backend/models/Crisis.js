const mongoose = require("mongoose");

const crisisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  location: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  image: { type: String }, // Optional field for crisis images
});

module.exports = mongoose.model("Crisis", crisisSchema);
