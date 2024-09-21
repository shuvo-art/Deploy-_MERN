const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["relief", "expense"], required: true }, // Two types of inventory
  quantity: { type: Number, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
