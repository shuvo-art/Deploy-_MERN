const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 1 },
  date: { type: Date, default: Date.now },
  donor: { type: String, required: true }, // Donor's name is required
});

module.exports = mongoose.model("Donation", donationSchema);
