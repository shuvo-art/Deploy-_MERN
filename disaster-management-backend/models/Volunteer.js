const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  assignedTask: { type: String, required: true },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
