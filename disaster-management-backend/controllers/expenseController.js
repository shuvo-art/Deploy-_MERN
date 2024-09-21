const Expense = require("../models/Expense"); // Assuming the Expense model is in the 'models' folder

// Add an expense
const addExpense = async (req, res) => {
  const { amount, date, details } = req.body;

  // Validate input
  if (!amount || !details) {
    return res
      .status(400)
      .json({ message: "Amount and details are required." });
  }

  try {
    // Create a new expense
    const newExpense = new Expense({
      amount,
      date: date || Date.now(), // If date is provided, use it; otherwise, use the current date
      details,
    });

    // Save the expense to the database
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense); // Return the saved expense
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.status(200).json(expenses); // Return the list of expenses
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses", error });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
