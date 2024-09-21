const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 1 },
  date: { type: Date, default: Date.now },
  details: { type: String, required: true }, // Required details of the expense
});

module.exports = mongoose.model("Expense", expenseSchema);
